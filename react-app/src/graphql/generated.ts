import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Account = {
  __typename?: 'Account';
  abi?: Maybe<Scalars['String']>;
  address: Scalars['ID'];
  balance: Scalars['String'];
  isContract: Scalars['Boolean'];
  name?: Maybe<Scalars['String']>;
  transactions: Array<Maybe<Transaction>>;
};

export type Block = {
  __typename?: 'Block';
  baseFeePerGas: Scalars['String'];
  difficulty: Scalars['String'];
  extraData: Scalars['String'];
  gasLimit: Scalars['String'];
  gasUsed: Scalars['String'];
  hash: Scalars['String'];
  miner: Scalars['String'];
  nonce: Scalars['Int'];
  number: Scalars['ID'];
  parentHash: Scalars['String'];
  timestamp: Scalars['Int'];
  transactions: Array<Maybe<Transaction>>;
};

export type Log = {
  __typename?: 'Log';
  address?: Maybe<Scalars['String']>;
  blockHash?: Maybe<Scalars['String']>;
  blockNumber: Scalars['Int'];
  data?: Maybe<Scalars['String']>;
  decodedLog?: Maybe<Scalars['String']>;
  index: Scalars['Int'];
  topics: Array<Maybe<Scalars['String']>>;
  transactionHash: Scalars['String'];
  transactionIndex: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  importABIs: RestResponse;
};


export type MutationImportAbIsArgs = {
  abis: Array<InputMaybe<Scalars['String']>>;
  addresses: Array<InputMaybe<Scalars['String']>>;
  names: Array<InputMaybe<Scalars['String']>>;
};

export type Query = {
  __typename?: 'Query';
  abi?: Maybe<Scalars['String']>;
  account?: Maybe<Account>;
  accounts: Array<Account>;
  block?: Maybe<Block>;
  blocks: Array<Maybe<Block>>;
  contract?: Maybe<Account>;
  contracts: Array<Account>;
  transaction?: Maybe<Transaction>;
  transactions: Array<Maybe<Transaction>>;
};


export type QueryAbiArgs = {
  address: Scalars['String'];
  cache: Scalars['Boolean'];
};


export type QueryAccountArgs = {
  address: Scalars['ID'];
};


export type QueryBlockArgs = {
  number: Scalars['ID'];
};


export type QueryContractArgs = {
  address: Scalars['ID'];
};


export type QueryTransactionArgs = {
  hash: Scalars['ID'];
};

export type RestResponse = {
  __typename?: 'RestResponse';
  status: Scalars['String'];
};

export type Transaction = {
  __typename?: 'Transaction';
  block: Block;
  blockNumber: Scalars['Int'];
  chainId: Scalars['Int'];
  data: Scalars['String'];
  from: Scalars['String'];
  gasLimit: Scalars['String'];
  gasPrice: Scalars['String'];
  hash: Scalars['ID'];
  maxFeePerGas: Scalars['String'];
  maxPriorityFeePerGas: Scalars['String'];
  nonce: Scalars['Int'];
  r: Scalars['String'];
  s: Scalars['String'];
  to?: Maybe<Scalars['String']>;
  transactionReceipt: TransactionReceipt;
  type: Scalars['Int'];
  v: Scalars['Int'];
  value: Scalars['String'];
};

export type TransactionReceipt = {
  __typename?: 'TransactionReceipt';
  blockHash: Scalars['String'];
  blockNumber: Scalars['Int'];
  contractAddress?: Maybe<Scalars['String']>;
  cumulativeGasUsed: Scalars['String'];
  from?: Maybe<Scalars['String']>;
  gasPrice: Scalars['String'];
  gasUsed: Scalars['String'];
  hash: Scalars['ID'];
  index: Scalars['String'];
  logs: Array<Maybe<Log>>;
  logsBloom?: Maybe<Scalars['String']>;
  status: Scalars['String'];
  to?: Maybe<Scalars['String']>;
};

export type AccountQueryVariables = Exact<{
  address: Scalars['ID'];
}>;


export type AccountQuery = { __typename?: 'Query', account?: { __typename?: 'Account', address: string, balance: string, transactions: Array<{ __typename?: 'Transaction', hash: string, nonce: number, from: string } | null> } | null };

export type BlockQueryVariables = Exact<{
  number: Scalars['ID'];
}>;


export type BlockQuery = { __typename?: 'Query', block?: { __typename?: 'Block', number: string, baseFeePerGas: string, difficulty: string, extraData: string, gasLimit: string, gasUsed: string, hash: string, miner: string, nonce: number, parentHash: string, timestamp: number, transactions: Array<{ __typename?: 'Transaction', hash: string, from: string } | null> } | null };

export type Combo1QueryVariables = Exact<{ [key: string]: never; }>;


export type Combo1Query = { __typename?: 'Query', accounts: Array<{ __typename?: 'Account', address: string, balance: string }>, contracts: Array<{ __typename?: 'Account', address: string, balance: string, name?: string | null }>, transactions: Array<{ __typename?: 'Transaction', hash: string, block: { __typename?: 'Block', number: string, timestamp: number } } | null>, blocks: Array<{ __typename?: 'Block', number: string, timestamp: number } | null> };

export type ContractQueryVariables = Exact<{
  address: Scalars['ID'];
}>;


export type ContractQuery = { __typename?: 'Query', contract?: { __typename?: 'Account', address: string, balance: string, name?: string | null, abi?: string | null, transactions: Array<{ __typename?: 'Transaction', hash: string, nonce: number, from: string } | null> } | null };

export type TransactionQueryVariables = Exact<{
  hash: Scalars['ID'];
}>;


export type TransactionQuery = { __typename?: 'Query', transaction?: { __typename?: 'Transaction', blockNumber: number, chainId: number, data: string, from: string, gasLimit: string, gasPrice: string, hash: string, maxFeePerGas: string, maxPriorityFeePerGas: string, nonce: number, r: string, s: string, to?: string | null, type: number, v: number, value: string, transactionReceipt: { __typename?: 'TransactionReceipt', blockHash: string, blockNumber: number, cumulativeGasUsed: string, contractAddress?: string | null, from?: string | null, gasPrice: string, gasUsed: string, hash: string, index: string, logsBloom?: string | null, status: string, to?: string | null, logs: Array<{ __typename?: 'Log', address?: string | null, blockHash?: string | null, blockNumber: number, data?: string | null, index: number, topics: Array<string | null>, transactionHash: string, transactionIndex: string, decodedLog?: string | null } | null> }, block: { __typename?: 'Block', timestamp: number } } | null };


export const AccountDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"account"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"address"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"account"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"address"},"value":{"kind":"Variable","name":{"kind":"Name","value":"address"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"balance"}},{"kind":"Field","name":{"kind":"Name","value":"transactions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"nonce"}},{"kind":"Field","name":{"kind":"Name","value":"from"}}]}}]}}]}}]} as unknown as DocumentNode<AccountQuery, AccountQueryVariables>;
export const BlockDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"block"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"number"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"block"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"number"},"value":{"kind":"Variable","name":{"kind":"Name","value":"number"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"number"}},{"kind":"Field","name":{"kind":"Name","value":"baseFeePerGas"}},{"kind":"Field","name":{"kind":"Name","value":"difficulty"}},{"kind":"Field","name":{"kind":"Name","value":"extraData"}},{"kind":"Field","name":{"kind":"Name","value":"gasLimit"}},{"kind":"Field","name":{"kind":"Name","value":"gasUsed"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"miner"}},{"kind":"Field","name":{"kind":"Name","value":"nonce"}},{"kind":"Field","name":{"kind":"Name","value":"parentHash"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"transactions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"from"}}]}}]}}]}}]} as unknown as DocumentNode<BlockQuery, BlockQueryVariables>;
export const Combo1Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"combo1"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accounts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"balance"}}]}},{"kind":"Field","name":{"kind":"Name","value":"contracts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"balance"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"transactions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"block"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"number"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"blocks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"number"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}}]}}]}}]} as unknown as DocumentNode<Combo1Query, Combo1QueryVariables>;
export const ContractDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"contract"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"address"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contract"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"address"},"value":{"kind":"Variable","name":{"kind":"Name","value":"address"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"balance"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"abi"}},{"kind":"Field","name":{"kind":"Name","value":"transactions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"nonce"}},{"kind":"Field","name":{"kind":"Name","value":"from"}}]}}]}}]}}]} as unknown as DocumentNode<ContractQuery, ContractQueryVariables>;
export const TransactionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"transaction"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"hash"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"transaction"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"hash"},"value":{"kind":"Variable","name":{"kind":"Name","value":"hash"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"blockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"data"}},{"kind":"Field","name":{"kind":"Name","value":"from"}},{"kind":"Field","name":{"kind":"Name","value":"gasLimit"}},{"kind":"Field","name":{"kind":"Name","value":"gasPrice"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"maxFeePerGas"}},{"kind":"Field","name":{"kind":"Name","value":"maxPriorityFeePerGas"}},{"kind":"Field","name":{"kind":"Name","value":"nonce"}},{"kind":"Field","name":{"kind":"Name","value":"r"}},{"kind":"Field","name":{"kind":"Name","value":"s"}},{"kind":"Field","name":{"kind":"Name","value":"to"}},{"kind":"Field","name":{"kind":"Name","value":"transactionReceipt"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"blockHash"}},{"kind":"Field","name":{"kind":"Name","value":"blockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"cumulativeGasUsed"}},{"kind":"Field","name":{"kind":"Name","value":"contractAddress"}},{"kind":"Field","name":{"kind":"Name","value":"from"}},{"kind":"Field","name":{"kind":"Name","value":"gasPrice"}},{"kind":"Field","name":{"kind":"Name","value":"gasUsed"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"index"}},{"kind":"Field","name":{"kind":"Name","value":"logs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"blockHash"}},{"kind":"Field","name":{"kind":"Name","value":"blockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"data"}},{"kind":"Field","name":{"kind":"Name","value":"index"}},{"kind":"Field","name":{"kind":"Name","value":"topics"}},{"kind":"Field","name":{"kind":"Name","value":"transactionHash"}},{"kind":"Field","name":{"kind":"Name","value":"transactionIndex"}},{"kind":"Field","name":{"kind":"Name","value":"decodedLog"}}]}},{"kind":"Field","name":{"kind":"Name","value":"logsBloom"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"to"}}]}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"v"}},{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"block"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"timestamp"}}]}}]}}]}}]} as unknown as DocumentNode<TransactionQuery, TransactionQueryVariables>;