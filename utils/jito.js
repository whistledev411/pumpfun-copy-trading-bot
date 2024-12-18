"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeJitoTx = void 0;
const web3_js_1 = require("@solana/web3.js");
const bs58_1 = __importDefault(require("bs58"));
const axios_1 = __importDefault(require("axios"));
const executeJitoTx = async (transactions, payer, commitment) => {
    const JITO_FEE = Number(process.env.JITO_FEE);
    if (!JITO_FEE)
        return console.log('Jito fee has not been set!');
    const RPC_ENDPOINT = process.env.RPC_ENDPOINT;
    if (!RPC_ENDPOINT)
        return console.log("Rpc has not been set!");
    const solanaConnection = new web3_js_1.Connection(RPC_ENDPOINT);
    // console.log('Starting Jito transaction execution...');
    const tipAccounts = [
        'Cw8CFyM9FkoMi7K7Crf6HNQqf4uEMzpKw6QNghXLvLkY',
        'DttWaMuVvTiduZRnguLF7jNxTgiMBZ1hyAumKUiL2KRL',
        '96gYZGLnJYVFmbjzopPSU6QiEV5fGqZNyN9nmNhvrZU5',
        '3AVi9Tg9Uo68tJfuvoKvqKNWKkC5wPdSSdeBnizKZ6jT',
        'HFqU5x63VTqvQss8hp11i4wVV8bD44PvwucfZ2bU7gRe',
        'ADaUMid9yfUytqMBgopwjb2DTLSokTSzL1zt6iGPaS49',
        'ADuUkR4vqLUMWXxW9gh6D6L8pMSawimctcNZ5pGwDcEt',
        'DfXygSm4jCyNCybVYYK6DwvWqjKee8pbDmJGcLWNDXjh',
    ];
    const jitoFeeWallet = new web3_js_1.PublicKey(tipAccounts[Math.floor(tipAccounts.length * Math.random())]);
    // console.log(`Selected Jito fee wallet: ${jitoFeeWallet.toBase58()}`);
    try {
        let latestBlockhash = await solanaConnection.getLatestBlockhash();
        const jitTipTxFeeMessage = new web3_js_1.TransactionMessage({
            payerKey: payer.publicKey,
            recentBlockhash: latestBlockhash.blockhash,
            instructions: [
                web3_js_1.SystemProgram.transfer({
                    fromPubkey: payer.publicKey,
                    toPubkey: jitoFeeWallet,
                    lamports: Math.floor(JITO_FEE * 10 ** 9),
                }),
            ],
        }).compileToV0Message();
        const jitoFeeTx = new web3_js_1.VersionedTransaction(jitTipTxFeeMessage);
        jitoFeeTx.sign([payer]);
        const jitoTxsignature = bs58_1.default.encode(transactions[0].signatures[0]);
        // Serialize the transactions once here
        const serializedjitoFeeTx = bs58_1.default.encode(jitoFeeTx.serialize());
        const serializedTransactions = [serializedjitoFeeTx];
        for (let i = 0; i < transactions.length; i++) {
            const serializedTransaction = bs58_1.default.encode(transactions[i].serialize());
            serializedTransactions.push(serializedTransaction);
        }
        const endpoints = [
            // 'https://mainnet.block-engine.jito.wtf/api/v1/bundles',
            // 'https://amsterdam.mainnet.block-engine.jito.wtf/api/v1/bundles',
            // 'https://frankfurt.mainnet.block-engine.jito.wtf/api/v1/bundles',
            'https://ny.mainnet.block-engine.jito.wtf/api/v1/bundles',
            // 'https://tokyo.mainnet.block-engine.jito.wtf/api/v1/bundles',
        ];
        const requests = endpoints.map((url) => axios_1.default.post(url, {
            jsonrpc: '2.0',
            id: 1,
            method: 'sendBundle',
            params: [serializedTransactions],
        }));
        // console.log('Sending transactions to endpoints...');
        const results = await Promise.all(requests.map((p) => p.catch((e) => e)));
        const successfulResults = results.filter((result) => !(result instanceof Error));
        if (successfulResults.length > 0) {
            // console.log(`Successful response`);
            // console.log(`Confirming jito transaction...`);
            const confirmation = await solanaConnection.confirmTransaction({
                signature: jitoTxsignature,
                lastValidBlockHeight: latestBlockhash.lastValidBlockHeight,
                blockhash: latestBlockhash.blockhash,
            }, commitment);
            console.log("🚀 ~ executeJitoTx ~ confirmation:", confirmation);
            if (confirmation.value.err) {
                console.log("Confirmtaion error");
                return null;
            }
            else {
                return jitoTxsignature;
            }
        }
        else {
            console.log(`No successful responses received for jito`);
        }
        console.log("case 1");
        return null;
    }
    catch (error) {
        console.log('Error during transaction execution', error);
        return null;
    }
};
exports.executeJitoTx = executeJitoTx;
