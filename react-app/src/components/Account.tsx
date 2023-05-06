import { AccountDocument, Account as Account_, Transaction as Transaction_ } from "../graphql/generated";
import { useQuery } from "@apollo/client";
import { useLocation } from 'react-router-dom';
import { useState } from "react";
import { getURLParam, URLParam } from "../utils/utils";
import { useAppSelector } from '../appContext/hooks'
import { selectAppState } from "../appContext/appContextSlice"

export type UIAccountInput = {
  address: string | null,
  onClick: (id) => void
  newAddress: string | null
}

type UITransaction = {
  nonce: number | null, 
  hash: string | null, 
  from: string | null
}

type UIAccountOutput = {
  address: string | null, 
  balance: string | null, 
  transactions: UITransaction[];
}

export let _setAddress;

export default function Account({address, onClick}: UIAccountInput) {
    let _appState = useAppSelector(selectAppState);
    if (!_appState) throw (new Error("NULL_APP_STATE"));
    const urlParam: URLParam = _appState.urlParam;
    
    const [ address_, setAddress ] = useState(address); 
    _setAddress = setAddress;
    
    const { data: gqlData, loading, error } = useQuery(AccountDocument, {
      variables: { address: address_ as string },
      skip: (address_ == undefined || address_ == null)
    }); 

    if (error) throw(error)

    const uidata: UIAccountOutput = {
      address: null,
      balance: null,
      transactions: []
    }

    if (gqlData) {
      const account: Account_ = gqlData.account as Account_
      uidata.address = account.address;
      uidata.balance = account.balance;
      const transactions: Transaction_[] = account.transactions as Transaction_[];
      transactions.map((item) => {
        uidata.transactions.push({
          nonce: item.nonce,
          hash: item.hash,
          from: item.from
        })
      })
    }

    const nav = (e) => {
      e.preventDefault();
      const hash = e.currentTarget.getAttribute("data-hash")
      onClick(hash);
      const bookmark = `${window.location.protocol}//${window.location.host}${window.location.pathname}#${urlParam.nab}/${urlParam.oTab}/Transaction/${hash}`;
      window.history.pushState({ path: bookmark }, '', bookmark);
    }

    return (
      <div>
        <div className="px-4 sm:px-0">
          <h3 className="text-base font-semibold leading-7 text-gray-900">EOA</h3>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">{uidata.address}</p>
        </div> 
        <div className="mt-6">
          <dl className="grid grid-cols-1 sm:grid-cols-2">
            <div className="border-t border-gray-100 px-4 py-6 sm:col-span-2 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">Balance</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">{uidata.balance}</dd>
            </div>
          </dl>
        </div>

        <div className="px-4 sm:px-0">
          <h3 className="text-base font-semibold leading-7 text-gray-900">Transactions</h3>
        </div>
        <div className="mt-6">
          <dl className="grid grid-cols-1 sm:grid-cols-1">
          {uidata.transactions.map((item, i) => (
            <div className="border-t border-gray-300 px-4 py-2 sm:col-span-1 sm:px-0">
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
