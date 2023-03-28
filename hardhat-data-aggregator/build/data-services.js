"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataServices = void 0;
var hardhat_types_1 = require("./hardhat-types");
var client_1 = require("@prisma/client");
var DataServices = /** @class */ (function () {
    function DataServices() {
        this.prisma = new client_1.PrismaClient();
    }
    DataServices.prototype.getAddresses = function (signers) {
        var addresses = [];
        for (var i = 0; i < signers.length; i++) {
            addresses.push(new hardhat_types_1.Address(signers[i].address));
        }
        return addresses;
    };
    return DataServices;
}());
exports.DataServices = DataServices;
