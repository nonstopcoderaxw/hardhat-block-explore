import Accounts from "../../components/Accounts"
import Contracts, { UIContractsInput } from "../../components/Contracts"
import Transactions, { UITransactionsInput } from "../../components/Transactions"
import Blocks, { UIBlocksInput } from "../../components/Blocks"
import Block, { UIBlockInput } from "../../components/Block"
import Account, { UIAccountInput, _setAddress } from "../../components/Account"
import Contract from "../../components/Contract"
import Transaction from "../../components/Transaction"
import Tabs, { UITabsInput } from "../../components/tailwindui/Tabs"
import { useAppSelector } from '../../appContext/hooks'
import { selectAppState } from "../../appContext/appContextSlice"
import { Account as Account_, Transaction as Transaction_, Block as Block_ } from "../../graphql/generated";
import { getURLParam, URLParam } from "../../utils/utils";
import { useLocation } from 'react-router-dom';
import { useState, useEffect, useLayoutEffect } from 'react'
import { Address } from "../../utils/Address"

export type UIOverviewInput = {
  oTab: number | null,
  oType: string | null,
  oId: string | null,
  implId: string | null,
  fIndex: number | null,
  frBN: number | null,
  toBN: number | null
};

type UIOverviewOutput = {
  uitabs: UITabsInput,
  oType: string,
  uicontracts: UIContractsInput,
  uitransactions: UITransactionsInput,
  uiblocks: UIBlocksInput,
  uiblock: UIBlockInput
}

export default function Overview({oTab, oType, oId, implId, fIndex, frBN, toBN}: UIOverviewInput) {
  // global
  let _appState = useAppSelector(selectAppState);
  if (!_appState) throw (new Error("NULL_APP_STATE"));
  const accounts: Account_[] = _appState.accounts as Account_[];
  const contracts: Account_[] = _appState.contracts as Account_[];
  const transactions: Transaction_[]  = _appState.transactions as Transaction_[];
  const blocks: Block_[] = _appState.blocks as Block_[];
  
  // check
  if (oTab && ![0, 1, 2, 3].includes(oTab)) throw ("invalid oTab");
  if (oType && !["account","contract","transaction","block"].includes(oType)) throw ("invalid oType");
  if (oId) try { oId = (new Address(oId)).value; } catch { throw ("invalid oId") }
  if (implId) try { implId = (new Address(implId as string)).value } catch { throw ("invalid implId") }
  if (fIndex) try { Number(fIndex) } catch { throw ("invalid fIndex") }
  if (frBN) try { Number(frBN) } catch { throw ("invalid frBN") }
  if (toBN) try { Number(toBN) } catch { throw ("invalid toBN") }
  
  // default
  if (!oTab) oTab = 0;
  if (!oType) oType = "account";
  if (!oId) oId = null;

  const [ oTab_, setOTab ] = useState(Number(oTab));
  const [ oType_, setType ] = useState(oType);
  const [ account_, setAccount ] = useState(oType == "account" ? oId : null);
  const [ contract_, setContract ] = useState(oType == "contract" ? oId : null);
  const [ implContract_, setImplContract ] = useState(implId);
  const [ fIndex_, setFIndex ] = useState<number | null>(Number(fIndex));
  const [ transaction_, setTransaction ] = useState(oType == "transaction" ? oId : null);
  const [ block_, setBlock ] = useState<number | null>(oType == "block" ? Number(oId) : null);

  const handlers = {
    accounts: (id) => {
      setType("account");
      setAccount(id);
    },
    contracts: (id) => {
      setType("contract");
      setContract(id);
      setImplContract(id);
      console.log(id);
      setContractAddress(id);
      setSelected(id);
      setQuery(id);
    },
    transactions: (id) => {
      setType("transaction");
      setTransaction(id);
    },
    blocks: (id) => {
      setType("block");
      setBlock(id);
    },
    account: (id) => {
      setType("transaction");
      setTransaction(id);
    },
    contract: (id) => {
      setType("transaction");
      setTransaction(id);
    },
    transaction: (id) => {
      setType("transaction");
      setTransaction(id);
    },
    block: (id) => {
      setType("transaction");
      setTransaction(id);
    },
    tab: (index: number) => {
      setOTab(index);
    }
  }

  const uitabs: UITabsInput = {
    tabs: [
      { name: 'EOAs', current: false },
      { name: 'Contracts', current: false },
      { name: 'Transactions', current: false },
      { name: 'Blocks', current: false }
    ],
    currentTabIndex: oTab_,
    onClick: handlers.tab
  }

  const uicontracts: UIContractsInput = {
    items: contracts.map((item) => {
      return {
        address: item.address,
        name: item.name as string,
        balance: item.balance
      }
    }),
    onClick: handlers.contracts
  }

  const uitransactions: UITransactionsInput = {
    items: transactions.map((item) => {
      return {
        hash: item.hash,
        timestamp: item.block.timestamp
      }
    }),
    onClick: handlers.transactions
  }

  const uiblocks: UIBlocksInput = {
    items: blocks.map((item) => {
      return {
        number: Number(item.number),
        timestamp: item.timestamp
      }
    }),
    onClick: handlers.blocks
  }

  const uiaccount: UIAccountInput = {
    address: account_,
    onClick: handlers.transaction,
    newAddress: account_
  }

  const uiblock: UIBlockInput = {
    blockNumber: block_,
    onClick: handlers.transaction
  }

  const uioverviewoutput: UIOverviewOutput = {
    uitabs: uitabs,
    oType: oType_,
    uicontracts: uicontracts,
    uitransactions: uitransactions,
    uiblocks: uiblocks,
    uiblock: uiblock
  }



  const [ contractAddress_, setContractAddress ] = useState(contract_);
  const [query, setQuery] = useState<string>('')
  const [selected, setSelected] = useState<string | null>(contract_)


  return (
     <>
       <div className="position-relative mx-auto w-full grow lg:flex xl:px-2">
          {/* Left sidebar & main wrapper */}
          <div className="flex-1 w-1/2 full-screen-height-left scrollable">
            <div className="sticky top-0 z-50 px-4 sm:px-6 lg:pl-8 xl:flex-1 xl:pl-6">
              <Tabs tabs={uioverviewoutput.uitabs.tabs} currentTabIndex={uioverviewoutput.uitabs.currentTabIndex} onClick={uioverviewoutput.uitabs.onClick} />
            </div>

            <div className="px-4 py-6 sm:px-6 lg:pl-8 xl:flex-1 xl:pl-6" data-index="0">
              {uioverviewoutput.uitabs.currentTabIndex === 0 ?
                <Accounts items={accounts} onClick={handlers.accounts}/> : <></>
              }
              {uioverviewoutput.uitabs.currentTabIndex === 1 ?
                <Contracts items={uioverviewoutput.uicontracts.items} onClick={uioverviewoutput.uicontracts.onClick} />  : <></>
              }
              {uioverviewoutput.uitabs.currentTabIndex === 2 ?
                <Transactions items={uioverviewoutput.uitransactions.items} onClick={uioverviewoutput.uitransactions.onClick} /> : <></>
              }
              {uioverviewoutput.uitabs.currentTabIndex === 3 ?
                <Blocks items={uioverviewoutput.uiblocks.items} onClick={uioverviewoutput.uiblocks.onClick} /> : <></>
              }
            </div>
          </div>
          <div className="scrollable full-screen-height-right shrink-0 border-t border-gray-200 px-4 py-6 sm:px-6 w-1/2 lg:border-l lg:border-t-0 lg:pr-8 xl:pr-6">
            <div className="">
              {uioverviewoutput.oType === "block" ? 
                <Block blockNumber={uioverviewoutput.uiblock.blockNumber} onClick={uioverviewoutput.uiblock.onClick}/> : <></>
              }
              {uioverviewoutput.oType === "account" ? 
                <Account address={account_} onClick={handlers.account} newAddress={account_} /> : <></>
              }
              {uioverviewoutput.oType === "contract" ? 
                <Contract address={contract_} implAddress={implContract_} selectedFuncIndex={fIndex_} contractAddress_={contractAddress_} setContractAddress={setContractAddress} query={query} setQuery={setQuery} selected={selected} setSelected={setSelected}/> : <></>
              }
              {uioverviewoutput.oType === "transaction" ? 
                <Transaction hash={transaction_} /> : <></>
              }
            </div>
          </div>
        </div>
      </>
  )
}
