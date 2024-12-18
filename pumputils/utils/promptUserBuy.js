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
const web3 = __importStar(require("@solana/web3.js"));
const inquirer_1 = __importDefault(require("inquirer"));
async function promptUserBuy() {
    // Load token
    let tokenAddress;
    //@ts-ignore
    const answer = await inquirer_1.default.prompt([
        {
            type: "input",
            name: "tokenAddress",
            message: "Enter token address:",
        },
    ]);
    tokenAddress = new web3.PublicKey(answer.tokenAddress);
    console.log("Loaded token address from user: ", tokenAddress.toString());
    // Load SOL amount to buy
    let solAmount;
    // If it's in the .env file load it
    if (process.env.SOL_AMOUNT) {
        solAmount = +process.env.SOL_AMOUNT;
        console.log("Loaded SOL amount from .env file: ", solAmount);
    }
    // Otherwise ask the user
    else {
        //@ts-ignore
        const answer = await inquirer_1.default.prompt([
            {
                type: "input",
                name: "solAmount",
                message: "Enter SOL amount:",
            },
        ]);
        solAmount = +answer.solAmount;
        console.log("Loaded SOL amount from user: ", solAmount);
    }
    // Load Slippage
    let slippage;
    // If it's in the .env file load it
    if (process.env.SOL_AMOUNT) {
        slippage = +process.env.SOL_AMOUNT;
        console.log("Loaded Slippage from .env file: ", slippage);
    }
    // Otherwise ask the user
    else {
        //@ts-ignore
        const answer = await inquirer_1.default.prompt([
            {
                type: "input",
                name: "slippage",
                message: "Enter Slippage:",
            },
        ]);
        slippage = +answer.slippage;
        console.log("Loaded Slippage from user: ", slippage);
    }
    // Load Slippage
    let priorityFee;
    // If it's in the .env file load it
    if (process.env.SOL_AMOUNT) {
        priorityFee = +process.env.SOL_AMOUNT;
        console.log("Loaded Priority Fee from .env file: ", priorityFee);
    }
    // Otherwise ask the user
    else {
        //@ts-ignore
        const answer = await inquirer_1.default.prompt([
            {
                type: "input",
                name: "priorityFee",
                message: "Enter Priority Fee:",
            },
        ]);
        priorityFee = +answer.priorityFee;
        console.log("Loaded priorityFee from user: ", priorityFee);
    }
    return { tokenAddress, solAmount, slippage, priorityFee };
}
exports.default = promptUserBuy;
