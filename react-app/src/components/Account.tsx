import { AccountDocument, Account as Account_, Transaction as Transaction_ } from "../graphql/generated";
import { useQuery } from "@apollo/client";
import { getURLParam, URLParam } from "../utils/utils";
import { useLocation } from 'react-router-dom';

export default function Account({address}) {
    const urlParam: URLParam = getURLParam(useLocation().hash);
    const { data, loading, error } = useQuery(AccountDocument, {
      variables: { address: address }
    }); 

    if (loading) return (
      <>
      </>
    );

    if (error) throw(error)

    const account: Account_ = data!.account as Account_
    const transactions: Transaction_[] = account.transactions as Transaction_[]

    const nav = (e) => {
      e.preventDefault();
      const hash = e.currentTarget.getAttribute("data-hash")
      window.location.hash = `#${urlParam.nab}/${urlParam.oTab}/Transaction/${hash}`
    }

    return (
      <div>
        <div className="px-4 sm:px-0">
          <h3 className="text-base font-semibold leading-7 text-gray-900">EOA</h3>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">{account.address}</p>
        </div> 
        <div className="mt-6">
          <dl className="grid grid-cols-1 sm:grid-cols-2">
            <div className="border-t border-gray-100 px-4 py-6 sm:col-span-2 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">Balance</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">{account.balance}</dd>
            </div>
          </dl>
        </div>

        <div className="px-4 sm:px-0">
          <h3 className="text-base font-semibold leading-7 text-gray-900">Transactions</h3>
        </div>
        <div className="mt-6">
          <dl className="grid grid-cols-1 sm:grid-cols-1">
          {transactions.map((item, i) => (
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
