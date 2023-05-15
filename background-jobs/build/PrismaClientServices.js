"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Delete = exports.Update = exports.Create = exports.Read = exports.PrismaClientServices = void 0;
class PrismaClientServices {
    constructor(prisma) {
        this.prisma = prisma;
        this.read = new Read(this.prisma);
        this.create = new Create(this.prisma);
        this.update = new Update(this.prisma);
        this.delete = new Delete(this.prisma);
    }
}
exports.PrismaClientServices = PrismaClientServices;
class Read {
    constructor(prisma) {
        this.prisma = prisma;
    }
}
exports.Read = Read;
class Create {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async accounts(accounts, balances, isContracts, skipDuplicates = true) {
        const data = accounts.map((item, i) => {
            return {
                address: item.value,
                balance: balances[i],
                isContract: isContracts[i]
            };
        });
        try {
            await this.prisma.account.createMany({
                data: data,
                skipDuplicates: skipDuplicates
            });
        }
        catch (e) {
            throw (e);
        }
    }
}
exports.Create = Create;
class Update {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async account(account, balance) {
        try {
            await this.prisma.account.updateMany({
                where: { address: account.value },
                data: {
                    balance: balance
                }
            });
        }
        catch (e) {
            throw (e);
        }
    }
}
exports.Update = Update;
class Delete {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async accounts(accountsToDel) {
        const data = accountsToDel.map((item) => {
            return item.value;
        });
        try {
            await this.prisma.account.deleteMany({
                where: { address: { in: data } }
            });
        }
        catch (e) {
            throw (e);
        }
    }
}
exports.Delete = Delete;
