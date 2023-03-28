import { PrismaClient, Account } from '@prisma/client';
import { Address } from "./hardhat-types";


export class PrismaClientServices {
	public readonly prisma: PrismaClient;
	private readonly read: Read;
	private readonly create: Create;
	private readonly delete: Delete;
	
	constructor() {
		this.prisma = new PrismaClient();
		this.read = new Read(this.prisma);
		this.create = new Create(this.prisma);
		this.delete = new Delete(this.prisma);
	}
}

export class Read {
	public readonly prisma: PrismaClient;

	constructor(prisma: PrismaClient) {
		this.prisma = prisma;
	}

	async accounts(): Promise<Account[] | void> {
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

	async accounts(newAccounts: Address[]): Promise<void> {
		const data = newAccounts.map((item) => {
			return { address: item.value }
		})
		try {
			await this.prisma.account.createMany({
		    	data: data
			})
		} catch (e: any) {
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

