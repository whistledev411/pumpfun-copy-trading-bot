"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BONDING_CURV = void 0;
const raydium_sdk_1 = require("@raydium-io/raydium-sdk");
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
