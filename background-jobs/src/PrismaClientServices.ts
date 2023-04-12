import { PrismaClient, Account } from '@prisma/client';
import { Address } from "./Address";


export class PrismaClientServices {
	public readonly prisma: PrismaClient;
	public readonly read: Read;
	public readonly create: Create;
	public readonly update: Update;
	public readonly delete: Delete;
	
	constructor(prisma: PrismaClient) {
		this.prisma = prisma;
		this.read = new Read(this.prisma);
		this.create = new Create(this.prisma);
		this.update = new Update(this.prisma);
		this.delete = new Delete(this.prisma);
	}
}

export class Read {
	public readonly prisma: PrismaClient;

	constructor(prisma: PrismaClient) {
		this.prisma = prisma;
	}

	async accounts(): Promise<Account[]> {
		try {
			return await this.prisma.account.findMany();
		} catch (e: any) {
			throw (e);
		}
	}
}

export class Create {
	public readonly prisma: PrismaClient;

	constructor(prisma: PrismaClient) {
		this.prisma = prisma;
	}

	async accounts(accounts: Address[], balances: string[], isContracts: boolean[], skipDuplicates: boolean = true): Promise<void> {
		const data = accounts.map((item, i) => {
			return { 
				address: item.value,
				balance: balances[i],
				isContract: isContracts[i]
			}
		})
		try {
			await this.prisma.account.createMany({
		    	data: data,
		    	skipDuplicates: skipDuplicates
			})
		} catch (e: any) {
			throw (e);
		}
	}
}

export class Update {
	public readonly prisma: PrismaClient;

	constructor(prisma: PrismaClient) {
		this.prisma = prisma;
	}

	async account(account: Address, balance: string): Promise<void> {
		try {
			await this.prisma.account.updateMany({
				where: { address: account.value },
				data:  {
					balance: balance
				}
			})
		} catch(e: any) {
			throw (e);
		}
	}
}

export class Delete {
	public readonly prisma: PrismaClient;

	constructor(prisma: PrismaClient) {
		this.prisma = prisma;
	}

	async accounts(accountsToDel: Address[]): Promise<void> {
		const data = accountsToDel.map((item) => {
			return item.value;
		})

		try {
			await this.prisma.account.deleteMany({
				where: { address: { in: data }}
			})
		} catch (e: any) {
			throw (e);
		}

	}

}

