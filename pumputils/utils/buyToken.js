"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const token = __importStar(require("@solana/spl-token"));
const web3 = __importStar(require("@solana/web3.js"));
const getBondingCurvePDA_1 = __importDefault(require("./getBondingCurvePDA"));
const tokenDataFromBondingCurveTokenAccBuffer_1 = __importDefault(require("./tokenDataFromBondingCurveTokenAccBuffer"));
const getBuyPrice_1 = __importDefault(require("./getBuyPrice"));
const anchor_1 = require("@coral-xyz/anchor");
const bn_js_1 = require("bn.js");
const pump_fun_json_1 = __importDefault(require("../idl/pump-fun.json"));
const getBondingCurveTokenAccountWithRetry_1 = __importDefault(require("./getBondingCurveTokenAccountWithRetry"));
const web3_js_1 = require("@solana/web3.js");
const jito_1 = require("../../utils/jito");
const BOANDING_CURVE_ACC_RETRY_AMOUNT = 50;
const BOANDING_CURVE_ACC_RETRY_DELAY = 10;
async function buyToken(mint, connection, keypair, solAmount, slippage, priorityFee) {
    try {
        // Load Pumpfun provider
        const provider = new anchor_1.AnchorProvider(connection, new anchor_1.Wallet(keypair), {
            commitment: "processed",
        });
        const program = new anchor_1.Program(pump_fun_json_1.default, provider);
        // Create transaction
        const transaction = new web3.Transaction();
        // Get/Create token account
        const associatedUser = await token.getAssociatedTokenAddress(mint, keypair.publicKey, false);
        // await token.getAccount(connection, associatedUser, "finalized");
        transaction.add(token.createAssociatedTokenAccountInstruction(keypair.publicKey, associatedUser, keypair.publicKey, mint));
        // console.log("Account created/loaded");
        // Buy token on Pump.fun
        // console.log("Buying");
        const programId = new web3.PublicKey('6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P');
        const bondingCurve = (0, getBondingCurvePDA_1.default)(mint, programId);
        const associatedBondingCurve = await token.getAssociatedTokenAddress(mint, bondingCurve, true);
        console.timeEnd('2');
        // let BondingCurveTokenAccount: web3.AccountInfo<Buffer> | null = null;
        const bondingCurveTokenAccount = await (0, getBondingCurveTokenAccountWithRetry_1.default)(connection, bondingCurve, BOANDING_CURVE_ACC_RETRY_AMOUNT, BOANDING_CURVE_ACC_RETRY_DELAY);
        console.timeEnd('3');
        if (bondingCurveTokenAccount === null) {
            throw new Error("Bonding curve account not found");
        }
        const tokenData = (0, tokenDataFromBondingCurveTokenAccBuffer_1.default)(bondingCurveTokenAccount.data);
        if (tokenData.complete) {
            throw new Error("Bonding curve already completed");
        }
        const SLIPAGE_POINTS = BigInt(slippage * 100);
        const solAmountLamp = BigInt(solAmount * web3.LAMPORTS_PER_SOL);
        const buyAmountToken = (0, getBuyPrice_1.default)(solAmountLamp, tokenData);
        const buyAmountSolWithSlippage = solAmountLamp + (solAmountLamp * SLIPAGE_POINTS) / 10000n;
        const FEE_RECEIPT = new web3.PublicKey("CebN5WGQ4jvEPvsVU4EoHEpgzq1VV7AbicfhtW4xC9iM");
        // request a specific compute unit budget
        const modifyComputeUnits = web3.ComputeBudgetProgram.setComputeUnitLimit({
            units: 600000,
        });
        // set the desired priority fee
        const addPriorityFee = web3.ComputeBudgetProgram.setComputeUnitPrice({
            microLamports: 0.002 * 1000000000,
            // microLamports: 1264480,
        });
        const latestBlockhash = await connection.getLatestBlockhash();
        transaction
            .add(modifyComputeUnits)
            .add(addPriorityFee)
            .add(await program.methods
            .buy(new bn_js_1.BN(buyAmountToken.toString()), new bn_js_1.BN(buyAmountSolWithSlippage.toString()))
            .accounts({
            feeRecipient: FEE_RECEIPT,
            mint: mint,
            associatedBondingCurve: associatedBondingCurve,
            associatedUser: associatedUser,
            user: keypair.publicKey,
        })
            .transaction());
        transaction.feePayer = keypair.publicKey;
        transaction.recentBlockhash = latestBlockhash.blockhash;
        const isJito = process.env.IS_JITO === 'true';
        if (isJito) {
            const messageV0 = new web3_js_1.TransactionMessage({
                payerKey: keypair.publicKey,
                recentBlockhash: latestBlockhash.blockhash,
                instructions: transaction.instructions,
            }).compileToV0Message();
            const versionedTx = new web3.VersionedTransaction(messageV0);
            versionedTx.sign([keypair]);
            const sig = await (0, jito_1.executeJitoTx)([versionedTx], keypair, 'confirmed');
            return sig;
        }
        else {
            const txSig = await connection.sendTransaction(transaction, [keypair], { skipPreflight: true, preflightCommitment: 'confirmed' });
            const confirmSig = await connection.confirmTransaction(txSig, 'confirmed');
            // console.log('confirm sig => ', confirmSig.value.err);
            // console.log(`Sending transaction for buying ${mint.toString()}, ${new Date().toISOString()}`);
            // const sig = await web3.sendAndConfirmTransaction(connection, transaction, [keypair], { skipPreflight: true, commitment: "confirmed", preflightCommitment: 'confirmed' });
            console.log("🚀 ~ sig:", txSig);
            return txSig;
        }
    }
    catch (error) {
        console.error(error);
        return false;
    }
}
exports.default = buyToken;
