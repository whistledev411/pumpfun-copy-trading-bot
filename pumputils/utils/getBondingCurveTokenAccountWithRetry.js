"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getBondingCurveTokenAccountWithRetry;
const wait_1 = __importDefault(require("./wait"));
async function getBondingCurveTokenAccountWithRetry(connection, bondingCurve, maxRetries = 5, retryDelay = 100) {
    let accountInfo = null;
    let retries = 0;
    while (retries < maxRetries) {
        try {
            accountInfo = await connection.getAccountInfo(bondingCurve, 'processed');
            // if (accountInfo) break;
        }
        catch (error) {
            console.error("Failed to get account info:", error);
        }
        retries++;
        await (0, wait_1.default)(retryDelay);
    }
    if (!accountInfo) {
        throw new Error(`Failed to get account info after ${maxRetries} retries`);
    }
    return accountInfo;
}
