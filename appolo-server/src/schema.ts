import { gql } from "graphql-tag";


export const typeDefs = gql`
  type Query {
    accounts: [Account!]!
    account(address: ID!): Account

    contracts: [Account!]!
    contract(address: ID!): Account 

    transactions: [Transaction]!
    transaction(hash: ID!): Transaction

    blocks: [Block]!
    block(number: ID!): Block

    abi(address: String!, cache: Boolean!): String

    profile: Profile!
  }

  type Mutation {
    importABIs(addresses: [String]!, names: [String]!, abis: [String]!): RestResponse!
    hh_send(data: String!, value: String!, from: String!, to: String): String
    hh_read(contractAddress: String!, funcName: String!, abi: String!, params: String!, blockTag: Int, address: String!): String
  }

  type RestResponse {
    status: String!
  } 

  type Profile {
    blockNumber: Int!
  }

  type Account {
  	address: ID!
  	balance: String!
  	isContract: Boolean!
    abi: String
    name: String
  	transactions: [Transaction]!
  }

  type Transaction {
  	hash: ID!
  	block: Block!
  	from: String!
  	blockNumber: Int!
  	transactionReceipt: TransactionReceipt!
  	chainId: Int!
  	data: String!
  	gasLimit: String!
  	gasPrice: String!
  	maxFeePerGas: String!
  	maxPriorityFeePerGas: String!
  	nonce: Int!
  	to: String
  	type: Int!
  	value: String!
  	r: String!
  	s: String!
  	v: Int!
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
  	nonce: Int!
  	parentHash: String!
  	timestamp: Int!
  }

  type TransactionReceipt {
  	hash: ID!
  	logs: [Log]!
	  blockHash: String!
    blockNumber: Int!
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
  	index: Int!
  	blockHash: String
  	blockNumber: Int!
  	address: String
  	data: String
  	topics: [String]!
    decodedLog: String
  }
`;
