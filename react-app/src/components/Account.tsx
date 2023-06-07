import { AccountDocument, Account as Account_, Transaction as Transaction_ } from "../graphql/generated";
import { useQuery } from "@apollo/client";
import { useState, useEffect, useMemo } from "react";
import { getURLParam, URLParam } from "../utils/utils";

export type AccountInputs = {
  defaultAddress: string | null,
  onClick: (id) => void,
  exportState?: (state: AccountState) => void
}

export type AccountState = {
  setAddress: (address) => void
}

type Transaction = {
  nonce: number | null, 
  hash: string | null, 
  from: string | null
}

type AccountOutputs = {
  address: string | null, 
  balance: string | null, 
  transactions: Transaction[];
}

export default function Account({defaultAddress, onClick, exportState}: AccountInputs) {

    const [ address, setAddress ] = useState<string | null>(defaultAddress); 

    const { data: gqlData, loading, error } = useQuery(AccountDocument, {
      variables: { address: address as string },
      skip: address === null
    }); 

    if (!loading && error) throw(error)

    const accountOutputs: AccountOutputs = {
      address: null,
      balance: null,
      transactions: []
    }

    if (gqlData) {
      const account: Account_ = gqlData.account as Account_
      accountOutputs.address = account.address;
      accountOutputs.balance = account.balance;
      const transactions: Transaction_[] = account.transactions as Transaction_[];
      transactions.map((item) => {
        accountOutputs.transactions.push({
          nonce: item.nonce,
          hash: item.hash,
          from: item.from
        })
        return null;
      })
    }

    const nav = (e) => {
      e.preventDefault();
      const hash = e.currentTarget.getAttribute("data-hash")
      onClick(hash);
      const urlParam: URLParam = getURLParam(window.location.hash);
      const bookmark = `${window.location.protocol}//${window.location.host}${window.location.pathname}#${urlParam.nab}/${urlParam.oTab}/transaction/${hash}`;
      window.history.pushState({ path: bookmark }, '', bookmark);
    }

    const state: AccountState = useMemo(()=>{
      return { setAddress: setAddress }
    }, [setAddress])
    

    useEffect(()=>{
      if (exportState) exportState(state);
    }, [state, exportState]);

    return (
      <div>
        <div className="px-4 sm:px-0">
          <h3 className="text-base font-semibold leading-7 text-gray-900">EOA</h3>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">{accountOutputs.address}</p>
        </div> 
        <div className="mt-6">
          <dl className="grid grid-cols-1 sm:grid-cols-2">
            <div className="border-t border-gray-100 px-4 py-6 sm:col-span-2 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">Balance</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">{accountOutputs.balance}</dd>
            </div>
          </dl>
        </div>
        <div className="px-4 sm:px-0">
          <h3 className="text-base font-semibold leading-7 text-gray-900">Transactions</h3>
        </div>
        <div className="mt-6">
          <dl className="grid grid-cols-1 sm:grid-cols-1">
          {accountOutputs.transactions.map((item, i) => (
            <div key={i} className="border-t border-gray-300 px-4 py-2 sm:col-span-1 sm:px-0">
               <div className="flex space-x-3">
                <div className="flex-shrink-0 text-xl"> 
                  {item.nonce}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-gray-900">
                      <a href="/#" onClick={nav} data-hash={item.hash}>{item.hash}</a>
                  </p>
                  <p className="text-sm text-gray-500">
                      from : {item.from}
                  </p>
                </div>
              </div>
            </div>
          ))}
          </dl>
        </div>
      </div>
  )
}
