"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Data = void 0;
var hardhat_types_1 = require("./hardhat-types");
var Data = /** @class */ (function () {
    function Data() {
    }
    Data.getAccounts = function (signers) {
        var _accounts = [];
        for (var i = 0; i < signers.length; i++) {
            _accounts.push(new hardhat_types_1.Address(signers[i].address));
        }
        return _accounts;
    };
    return Data;
}());
exports.Data = Data;
