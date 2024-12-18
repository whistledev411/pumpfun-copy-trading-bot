"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = wait;
async function wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
