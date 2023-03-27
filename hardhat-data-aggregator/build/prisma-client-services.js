"use strict";
// import { PrismaClient, Account } from '@prisma/client'
// export class PrismaClientServices {
// 	public readonly prisma: PrismaClient;
// 	private readonly read: Read;
// 	constructor() {
// 		this.prisma = new PrismaClient();
// 		this.read = new Read(this.prisma);
// 	}
// }
// export class Read {
// 	public readonly prisma: PrismaClient;
// 	constructor(prisma: PrismaClient) {
// 		this.prisma = prisma;
// 	}
// 	async accounts(): Promise<Account[]> {
// 		return await this.prisma.account.findMany();
// 	}
// }
// export class Create {
// 	public readonly prisma: PrismaClient;
// 	constructor(prisma: PrismaClient) {
// 		this.prisma = prisma;
// 	}
// 	async account(newAccount: Account): Promise<Boolean> {
// 		await prisma.user.create({
// 		    data: {
// 		      name: 'Alice',
// 		      email: 'alice@prisma.io',
// 		      posts: {
// 		        create: { title: 'Hello World' },
// 		      },
// 		      profile: {
// 		        create: { bio: 'I like turtles' },
// 		      },
// 		    },
// 		 })
// 	}
// }
