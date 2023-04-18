import { gql } from "graphql-tag";


export const typeDefs = gql`
  type Query {
    accounts: [Account!]!
    account(address: ID!): Account!

    contracts: [Account!]!
    contract(address: ID!): Account!

    transactions: [Transaction]!
    transaction(hash: ID!): Transaction!

    blocks: [Block]!
    block(number: ID!): Block!

    abi(address: String!, cache: Boolean!): String!
  }

  type Mutation {
    importABIs(addresses: [String]!, names: [String]!, abis: [String]!): RestResponse!
  }

  type RestResponse {
    status: String!
  } 

  type Account {
  	address: ID!
  	balance: String!
  	isContract: Boolean!
  	transactions: [Transaction]!
  }

  type Transaction {
  	hash: ID!
  	block: Block!
  	from: String!
  	blockNumber: String!
  	transactionReceipt: TransactionReceipt!
  	chainId: String!
  	data: String!
  	gasLimit: String!
  	gasPrice: String!
  	maxFeePerGas: String!
  	maxPriorityFeePerGas: String!
  	nonce: String!
  	to: String
  	type: String!
  	value: String!
  	r: String!
  	s: String!
  	v: String!
  }

  type Block {
  	number: ID!
  	transactions: [Transaction]!
  	baseFeePerGas: String!
  	difficulty: String!
  	extraData: String!
  	gasLimit: String!
  	gasUsed: String!
  	hash: String!
  	miner: String!
  	nonce: String!
  	parentHash: String!
  	timestamp: String!
  }

  type TransactionReceipt {
  	hash: ID!
  	logs: [Log]!
	  blockHash: String!
    blockNumber: String!
    contractAddress: String
    cumulativeGasUsed: String!
    from: String
    gasPrice: String!
    gasUsed: String!
    index: String!
    logsBloom: String
    status: String!
    to: String
  }

  type Log {
  	transactionHash: String!
  	transactionIndex: String!
  	index: String!
  	blockHash: String
  	blockNumber: String!
  	address: String
  	data: String
  	topics: [String]!
  }
`;
