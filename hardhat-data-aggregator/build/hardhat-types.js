"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Address = void 0;
var ethers_1 = require("ethers");
var Address = /** @class */ (function () {
    function Address(address) {
        this.value = (0, ethers_1.getAddress)(address);
    }
    return Address;
}());
exports.Address = Address;
