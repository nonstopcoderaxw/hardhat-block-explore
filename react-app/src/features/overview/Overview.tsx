import Accounts, { AccountsInputs } from "../../components/Accounts"
import Contracts, { ContractsInputs } from "../../components/Contracts"
import Transactions, { TransactionsInputs } from "../../components/Transactions"
import Blocks, { BlocksInputs } from "../../components/Blocks"
import Block, { BlockInputs, BlockState } from "../../components/Block"
import Account, { AccountInputs, AccountState } from "../../components/Account"
import Contract, { ContractState, ContractInputs } from "../../components/Contract"
import Transaction, { TransactionInputs, TransactionState } from "../../components/Transaction"
import Tabs, { TabsInputs } from "../../components/tailwindui/Tabs"
import { useAppSelector } from '../../appContext/hooks'
import { selectAppState } from "../../appContext/appContextSlice"
import { Account as Account_, Transaction as Transaction_, Block as Block_ } from "../../graphql/generated";
import { useState } from 'react'
import { Address } from "../../utils/Address"

export type OverviewInputs = {
  oTab: number | null,
  oType: string | null,
  oId: string | null,
  implId: string | null,
  fIndex: number | null
};

type OverviewOutputs = {
  tabsInputs: TabsInputs,
  oType: string,
  accountsInputs: AccountsInputs,
  contractsInputs: ContractsInputs,
  transactionsInputs: TransactionsInputs,
  blocksInputs: BlocksInputs,
  blockInputs: BlockInputs,
  accountInputs: AccountInputs,
  contractInputs: ContractInputs,
  transactionInputs: TransactionInputs,
}

type OverviewState = {
  account: AccountState | null,
  contract: ContractState | null,
  transaction: TransactionState | null,
  block: BlockState | null
}

export default function Overview({oTab, oType, oId, implId, fIndex}: OverviewInputs) {
  // global
  let _appState = useAppSelector(selectAppState);
  if (!_appState) throw (new Error("NULL_APP_STATE"));
  const accounts: Account_[] = _appState.accounts as Account_[];
  const contracts: Account_[] = _appState.contracts as Account_[];
  const transactions: Transaction_[]  = _appState.transactions as Transaction_[];
  const blocks: Block_[] = _appState.blocks as Block_[];
  
  // check
  if (oTab && ![0, 1, 2, 3].includes(oTab)) throw (new Error("invalid oTab"));
  if (oType && !["account","contract","transaction","block"].includes(oType)) throw (new Error("invalid oType"));
  if (implId) try { implId = (new Address(implId as string)).value } catch { throw (new Error("invalid implId")) }
  if (fIndex) try { Number(fIndex) } catch { throw (new Error("invalid fIndex")) }
  
  // default
  if (!oTab) oTab = 0;
  if (!oType) oType = "account";
  if (!oId) oId = null;

  const [ oTab_, setOTab ] = useState(Number(oTab));
  const [ oType_, setType ] = useState(oType);
  const [ oId_ , setOId] = useState(oId);
  const [ , setImplId] = useState(implId);
  const [ fIndex_ , setFIndex] = useState(fIndex);

  const state: OverviewState = {
    account: null, 
    contract: null,
    transaction: null,
    block: null
  }

  const exportStateHandler = {
    account: (accountState: AccountState) => {
      state.account = accountState;
    }, 
    contract: (contractState: ContractState) => {
      state.contract = contractState;
    },
    transaction: (transactionState: TransactionState) => {
      state.transaction = transactionState;
    },
    block: (blockState: BlockState) => {
      state.block = blockState;
    }
  }

  const handlers = {
    accounts: (id) => {
      if (id === oId_) return null;
      setType("account");
      setOId(id);
      if (state.account && state.account.address) state.account.address[1](id);
    },
    contracts: (id) => {
      if (id === oId_) return null;
      setType("contract");
      setOId(id);
      setImplId(id);
      setFIndex(null);
      if (state.contract 
          && state.contract.contractAddress 
          && state.contract.implAddress
          && state.contract.selectedFuncIndex
          //&& state.contract.params
        ) {
        state.contract.contractAddress[1](id);
        state.contract.implAddress[1](id);
        state.contract.selectedFuncIndex[1](null);
        //state.contract.params[1]({});
      }
      if (state.contract && state.contract.selectedFuncIndex) state.contract.selectedFuncIndex[1](0);
    },
    transactions: (id) => {
      if (id === oId_) return null;
      setType("transaction");
      setOId(id);
      if (state.transaction && state.transaction.hash) state.transaction.hash[1](id);
    },
    blocks: (id) => {
      if (id === oId_) return null;
      setType("block");
      setOId(id);
      if (state.block && state.block.blockNumber) state.block.blockNumber[1](Number(id));
    },
    account: (id) => {
      if (id === oId_) return null;
      setType("transaction");
      setOId(id);
      if (state.transaction && state.transaction.hash) state.transaction.hash[1](id);
    },
    contract: (id) => {
      // setType("transaction");
      // setTransaction(id);
    },
    transaction: (id) => {},
    block: (id) => {},
    tab: (index: number) => {
      setOTab(index);
    }
  }

  const tabsInputs: TabsInputs = {
    tabs: [
      { name: 'EOAs', current: false },
      { name: 'Contracts', current: false },
      { name: 'Transactions', current: false },
      { name: 'Blocks', current: false }
    ],
    currentTabIndex: oTab_,
    onClick: handlers.tab
  }

  const accountsInputs: AccountsInputs = {
    items: accounts.map((item) => {
        return { 
          address: item.address,
          balance: item.balance
        }
    }),
    onClick: handlers.accounts
  }

  const contractsInputs: ContractsInputs = {
    items: contracts.map((item) => {
      return {
        address: item.address,
        name: item.name as string,
        balance: item.balance
      }
    }),
    onClick: handlers.contracts
  }

  const transactionsInputs: TransactionsInputs = {
    items: transactions.map((item) => {
      return {
        hash: item.hash,
        timestamp: item.block.timestamp
      }
    }),
    onClick: handlers.transactions
  }

  const blocksInputs: BlocksInputs = {
    items: blocks.map((item) => {
      return {
        number: Number(item.number),
        timestamp: item.timestamp
      }
    }),
    onClick: handlers.blocks,
  }

  const accountInputs: AccountInputs = {
    defaultAddress: oType_ === "account" ? oId_ : null,
    onClick: handlers.account,
    exportState: exportStateHandler.account
  }

  const contractInputs: ContractInputs = {
    defaultContractAddress: oType_ === "contract" ? oId_ : null,
    defaultImplAddress: oType_ === "contract" ? oId_ : null,
    defaultSelectedFuncIndex: fIndex_,
    exportState: exportStateHandler.contract
  }

  const blockInputs: BlockInputs = {
    defaultBlockNumber: oType_ === "block" ? Number(oId_) : null,
    onClick: handlers.transactions,
    exportState: exportStateHandler.block
  }

  const transactionInputs: TransactionInputs = {
    defaultHash: oType_ === "transaction" ? oId_ : null,
    exportState: exportStateHandler.transaction
  }

  const overviewOutputs: OverviewOutputs = {
    tabsInputs: tabsInputs,
    oType: oType_,
    accountsInputs: accountsInputs,
    contractsInputs: contractsInputs,
    transactionsInputs: transactionsInputs,
    blocksInputs: blocksInputs,
    blockInputs: blockInputs,
    accountInputs: accountInputs,
    contractInputs: contractInputs,
    transactionInputs: transactionInputs
  }

  return (
     <>
       <div className="position-relative mx-auto w-full grow lg:flex xl:px-2">
          {/* Left sidebar & main wrapper */}
          <div className="flex-1 w-1/2 full-screen-height-left scrollable">
            <div className="sticky top-0 z-50 px-4 sm:px-6 lg:pl-8 xl:flex-1 xl:pl-6">
              <Tabs tabs={overviewOutputs.tabsInputs.tabs} currentTabIndex={overviewOutputs.tabsInputs.currentTabIndex} onClick={overviewOutputs.tabsInputs.onClick} />
            </div>

            <div className="px-4 py-6 sm:px-6 lg:pl-8 xl:flex-1 xl:pl-6" data-index="0">
              {overviewOutputs.tabsInputs.currentTabIndex === 0 ?
                <Accounts items={overviewOutputs.accountsInputs.items} onClick={overviewOutputs.accountsInputs.onClick}/> : <></>
              }
              {overviewOutputs.tabsInputs.currentTabIndex === 1 ?
                <Contracts items={overviewOutputs.contractsInputs.items} onClick={overviewOutputs.contractsInputs.onClick} />  : <></>
              }
              {overviewOutputs.tabsInputs.currentTabIndex === 2 ?
                <Transactions items={overviewOutputs.transactionsInputs.items} onClick={overviewOutputs.transactionsInputs.onClick} /> : <></>
              }
              {overviewOutputs.tabsInputs.currentTabIndex === 3 ?
                <Blocks items={overviewOutputs.blocksInputs.items} onClick={overviewOutputs.blocksInputs.onClick} /> : <></>
              }
            </div>
          </div>
          <div id="right-section" className="scrollable full-screen-height-right shrink-0 border-t border-gray-200 px-4 py-6 sm:px-6 w-1/2 lg:border-l lg:border-t-0 lg:pr-8 xl:pr-6">
            <div className="">
              {overviewOutputs.oType === "block" ? 
                <Block defaultBlockNumber={overviewOutputs.blockInputs.defaultBlockNumber} onClick={overviewOutputs.blockInputs.onClick} exportState={overviewOutputs.blockInputs.exportState}/> : <></>
              }
              {overviewOutputs.oType === "account" ? 
                <Account defaultAddress={overviewOutputs.accountInputs.defaultAddress} onClick={overviewOutputs.accountInputs.onClick} exportState={overviewOutputs.accountInputs.exportState}/> : <></>
              }
              {overviewOutputs.oType === "contract" ? 
                <Contract defaultContractAddress={overviewOutputs.contractInputs.defaultContractAddress} defaultImplAddress={overviewOutputs.contractInputs.defaultImplAddress} defaultSelectedFuncIndex={overviewOutputs.contractInputs.defaultSelectedFuncIndex} exportState={overviewOutputs.contractInputs.exportState} /> : <></>
              }
              {overviewOutputs.oType === "transaction" ? 
                <Transaction defaultHash={overviewOutputs.transactionInputs.defaultHash} exportState={transactionInputs.exportState} /> : <></>
              }
            </div>
          </div>
        </div>
      </>
  )
}
