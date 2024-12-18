"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const borsh_1 = require("@coral-xyz/borsh");
function tokenDataFromBondingCurveTokenAccBuffer(buffer) {
    const structure = (0, borsh_1.struct)([
        (0, borsh_1.u64)("discriminator"),
        (0, borsh_1.u64)("virtualTokenReserves"),
        (0, borsh_1.u64)("virtualSolReserves"),
        (0, borsh_1.u64)("realTokenReserves"),
        (0, borsh_1.u64)("realSolReserves"),
        (0, borsh_1.u64)("tokenTotalSupply"),
        (0, borsh_1.bool)("complete"),
    ]);
    let value = structure.decode(buffer);
    return {
        discriminator: BigInt(value.discriminator),
        virtualTokenReserves: BigInt(value.virtualTokenReserves),
        virtualSolReserves: BigInt(value.virtualSolReserves),
        realTokenReserves: BigInt(value.realTokenReserves),
        realSolReserves: BigInt(value.realSolReserves),
        tokenTotalSupply: BigInt(value.tokenTotalSupply),
        complete: value.complete,
    };
}
exports.default = tokenDataFromBondingCurveTokenAccBuffer;
