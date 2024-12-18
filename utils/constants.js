"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BONDING_CURV = exports.PUMP_URL = exports.PUMP_FUN_PROGRAM = exports.PUMP_FUN_ACCOUNT = exports.RENT = exports.TOKEN_PROGRAM = exports.SYSTEM_PROGRAM = exports.FEE_RECIPIENT = exports.GLOBAL = exports.commitment = exports.BONDING_ADDR_SEED = exports.TRADE_PROGRAM_ID = exports.computeUnit = void 0;
const web3_js_1 = require("@solana/web3.js");
const raydium_sdk_1 = require("@raydium-io/raydium-sdk");
exports.computeUnit = 100000;
exports.TRADE_PROGRAM_ID = new web3_js_1.PublicKey('6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P');
exports.BONDING_ADDR_SEED = new Uint8Array([98, 111, 110, 100, 105, 110, 103, 45, 99, 117, 114, 118, 101]);
exports.commitment = "confirmed";
exports.GLOBAL = new web3_js_1.PublicKey("4wTV1YmiEkRvAtNtsSGPtUrqRYQMe5SKy2uB4Jjaxnjf");
exports.FEE_RECIPIENT = new web3_js_1.PublicKey("CebN5WGQ4jvEPvsVU4EoHEpgzq1VV7AbicfhtW4xC9iM");
exports.SYSTEM_PROGRAM = new web3_js_1.PublicKey("11111111111111111111111111111111");
exports.TOKEN_PROGRAM = new web3_js_1.PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA");
exports.RENT = new web3_js_1.PublicKey("SysvarRent111111111111111111111111111111111");
exports.PUMP_FUN_ACCOUNT = new web3_js_1.PublicKey("Ce6TQqeHC9p8KetsN6JsjHK7UTZk7nasjjnr7XxXp9F1");
exports.PUMP_FUN_PROGRAM = new web3_js_1.PublicKey("6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P");
exports.PUMP_URL = "eyJhbGciOiJIUzI1NiJ9.aHR0cHM6Ly9nZXRwa2JlLXByb2R1Y3Rpb24udXAucmFpbHdheS5hcHA.CCVh07nM7u5dCglF6CbTWJwsR0MOnsmPDnOXGn7bxfY";
exports.BONDING_CURV = (0, raydium_sdk_1.struct)([
    // u64('initialized'),
    // publicKey('authority'),
    // publicKey('feeRecipient'),
    // u64('initialVirtualTokenReserves'),
    // u64('initialVirtualSolReserves'),
    // u64('initialRealTokenReserves'),
    // u64('tokenTotalSupply'),
    // u64('feeBasisPoints'),
    (0, raydium_sdk_1.u64)('virtualTokenReserves'),
    (0, raydium_sdk_1.u64)('virtualSolReserves'),
    (0, raydium_sdk_1.u64)('realTokenReserves'),
    (0, raydium_sdk_1.u64)('realSolReserves'),
    (0, raydium_sdk_1.u64)('tokenTotalSupply'),
    (0, raydium_sdk_1.bool)('complete'),
]);
