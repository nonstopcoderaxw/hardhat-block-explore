import { TransactionDocument, Transaction as Transaction_, TransactionReceipt as TransactionReceipt_, Log as Log_ } from "../graphql/generated";
import { useQuery } from "@apollo/client";
import { State } from "../utils/utils";
import { useState, useEffect } from "react"



export type TransactionInputs = {
  defaultHash: string | null,
  exportState?: (state: TransactionState) => void
}

export type TransactionState = {
  hash: State<string | null> | null
}

export default function Transaction({defaultHash, exportState}: TransactionInputs) {

  const [ hash, setHash ] = useState(defaultHash);

  useEffect(() => {
    const state: TransactionState = {
      hash: [ hash, setHash ]
    }

    if(exportState) exportState(state);
  }, [hash, setHash, exportState])
 
  const { data: gqlData, loading, error } = useQuery(TransactionDocument, {
    variables: { hash: hash! },
    skip: hash === null
  }); 

  if (!loading && error) throw(error)
  
  if (!gqlData) return (
      <div>
        <div className="px-4 sm:px-0">
          <h3 className="text-base font-semibold leading-7 text-gray-900">Transaction Details</h3>
        </div>
      </div>
  );


  var transaction: Transaction_;
  var transactionReceipt: TransactionReceipt_;
  var logs: Log_[];
  var decodedLogs: any[];

  transaction = gqlData.transaction as Transaction_
  transactionReceipt = transaction.transactionReceipt as TransactionReceipt_
  logs = transactionReceipt.logs as Log_[]
  
  decodedLogs = logs.map((item: Log_) => {
    if(item.decodedLog) return JSON.parse(item.decodedLog)
    return null;
  })

  
  return (
    <div>
      <div className="px-4 sm:px-0">
        <h3 className="text-base font-semibold leading-7 text-gray-900">Transaction Details</h3>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">{transaction.hash}</p>
      </div>
      <div className="mt-6">
        <dl className="grid grid-cols-1 sm:grid-cols-2">
          <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Timestamp</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">{transaction.block.timestamp}</dd>
          </div>
          <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Block Number</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">{transaction.blockNumber}</dd>
          </div>
          <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Nonce</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">{transaction.nonce}</dd>
          </div>
          <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Index (Receipt)</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">{transactionReceipt.index}</dd>
          </div>
          <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Type</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">{transaction.type}</dd>
          </div>
          <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Chain Id</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">{transaction.chainId}</dd>
          </div>
          <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Gas Limit</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">{transaction.gasLimit}</dd>
          </div>
          <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Gas Price</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">{transaction.gasPrice}</dd>
          </div>
          <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Max Fee Per Gas</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">{transaction.maxFeePerGas}</dd>
          </div>
          <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Max Priority Fee Per Gas</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">{transaction.maxFeePerGas}</dd>
          </div>
          <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Cumulative Gas Used (Receipt)</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">{transactionReceipt.cumulativeGasUsed}</dd>
          </div>
          <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Value</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">{transaction.value}</dd>
          </div>
          <div className="border-t border-gray-100 px-4 py-6 sm:col-span-2 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">From</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">{transaction.from}</dd>
          </div>
          <div className="border-t border-gray-100 px-4 py-6 sm:col-span-2 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">To</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">{transaction.to}</dd>
          </div>
          <div className="border-t border-gray-100 px-4 py-6 sm:col-span-2 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Contract Address (Receipt)</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">{transactionReceipt.contractAddress}</dd>
          </div>
          <div className="border-t border-gray-100 px-4 py-6 sm:col-span-2 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">r</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">{transaction.r}</dd>
          </div>
          <div className="border-t border-gray-100 px-4 py-6 sm:col-span-2 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">s</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">{transaction.s}</dd>
          </div>
          <div className="border-t border-gray-100 px-4 py-6 sm:col-span-2 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">v</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">{transaction.v}</dd>
          </div>
          <div className="border-t border-gray-100 px-4 py-6 sm:col-span-2 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Data</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2 override-break-word">
              {transaction.data}
            </dd>
          </div>
          <div className="border-t border-gray-100 px-4 py-6 sm:col-span-2 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">logs Bloom (Receipt)</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2 override-break-word">
              {transactionReceipt.logsBloom}
            </dd>
          </div>
        </dl>
      </div>

      <div className="px-4 sm:px-0">
        <h3 className="text-base font-semibold leading-7 text-gray-900">Logs</h3>
      </div>
      <div className="mt-6">
        <dl className="grid grid-cols-1 sm:grid-cols-1">
        {logs.map((item, i) => (
          <div key={item.address} className="border-t border-gray-300 px-4 py-2 sm:col-span-1 sm:px-0">
             <div className="flex space-x-3">
              <div className="flex-shrink-0 text-xl"> 
                {i}
              </div>
              {decodedLogs[i] != null ? 
                (
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-gray-900">
                        {decodedLogs[i].address}
                    </p>
                    <p className="text-sm text-gray-500">
                      {decodedLogs[i].name} 
                    </p>
                    <hr className="border-gray-200" />
                    <p className="text-sm text-gray-500">
                      {decodedLogs[i].events.map((event, eindex) => (
                          <span key={eindex}>{event.name}({event.type}): {event.value}<br/></span>
                      ))}
                    </p>
                  </div>
                )
                : (
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-gray-900">
                          from: {item.address}
                      </p>
                      <p className="text-sm font-semibold text-gray-900">
                          data: {item.data}
                      </p>
                      <p className="text-sm text-gray-500">
                          topics: {item.topics}
                      </p>
                      <hr className="border-gray-200" />
                    </div>
                  )
              }
            </div>
          </div>
        ))}
        </dl>
      </div>
      
    </div>
  )
}
