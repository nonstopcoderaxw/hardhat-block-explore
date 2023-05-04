import Accounts from "../../components/Accounts"
import Contracts from "../../components/Contracts"
import Transactions from "../../components/Transactions"
import Blocks from "../../components/Blocks"
import Block from "../../components/Block"
import Account from "../../components/Account"
import Contract from "../../components/Contract"
import Transaction from "../../components/Transaction"
import Tabs from "../../components/tailwindui/Tabs"
import { useAppSelector } from '../../appContext/hooks'
import { selectAppState } from "../../appContext/appContextSlice"
import { Account as Account_, Transaction as Transaction_, Block as Block_ } from "../../graphql/generated";
import { getURLParam, URLParam } from "../../utils/utils";
import { useLocation } from 'react-router-dom';


export default function Overview() {
  const urlParam: URLParam = getURLParam(useLocation().hash);


  let _appState = useAppSelector(selectAppState);
  if (!_appState) throw (new Error("NULL_APP_STATE"));
  const accounts: Account_ = _appState.accounts as Account_;
  const contracts: Account_[] = _appState.contracts as Account_[];
  const transactions: Transaction_[]  = _appState.transactions as Transaction_[];
  const blocks: Block_[] = _appState.blocks as Block_[];

  const tabs = [
    { name: 'EOAs' },
    { name: 'Contracts' },
    { name: 'Transactions' },
    { name: 'Blocks' },
  ]

  const tab = {
    tabs: tabs,
    currentTabIndex: urlParam.oTab,
  }

  return (
     <>
       <div className="position-relative mx-auto w-full grow lg:flex xl:px-2">
          {/* Left sidebar & main wrapper */}
          <div className="flex-1 w-1/2 full-screen-height-left scrollable">
            <div className="sticky top-0 z-50 px-4 sm:px-6 lg:pl-8 xl:flex-1 xl:pl-6">
              <Tabs tabs={tab.tabs} currentTabIndex={tab.currentTabIndex} />
            </div>

            <div className="px-4 py-6 sm:px-6 lg:pl-8 xl:flex-1 xl:pl-6" data-index="0">
              {tab.currentTabIndex === "0" ?
                <Accounts data={accounts} /> : <></>
              }
              {tab.currentTabIndex === "1" ?
                <Contracts data={contracts}/>  : <></>
              }
              {tab.currentTabIndex === "2" ?
                <Transactions data={transactions}/> : <></>
              }
              {tab.currentTabIndex === "3" ?
                <Blocks data={blocks}/> : <></>
              }
            </div>
          </div>
          <div className="scrollable full-screen-height-right shrink-0 border-t border-gray-200 px-4 py-6 sm:px-6 w-1/2 lg:border-l lg:border-t-0 lg:pr-8 xl:pr-6">
            <div className="">
              {urlParam.oType === "Block" ? 
                <Block blockNumber={urlParam.oId}/> : <></>
              }
              {urlParam.oType === "Account" ? 
                <Account address={urlParam.oId == null ? _appState.selectedAccount : urlParam.oId} /> : <></>
              }
              {urlParam.oType === "Contract" ? 
                <Contract address={urlParam.oId}/> : <></>
              }
              {urlParam.oType === "Transaction" ? 
                <Transaction hash={urlParam.oId} /> : <></>
              }
            </div>
          </div>
        </div>
      </>
  )
}
