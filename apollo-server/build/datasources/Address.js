"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Address = void 0;
const ethers_1 = require("ethers");
class Address {
    constructor(address) {
        this.value = (0, ethers_1.getAddress)(address);
    }
    equal(b) {
        if (this.value == b.value) {
            return true;
        }
        return false;
    }
}
exports.Address = Address;
