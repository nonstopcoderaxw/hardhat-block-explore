import { BlockDocument, Block as Block_, Transaction as Transaction_ } from "../graphql/generated";
import { useQuery } from "@apollo/client";
import { getURLParam, URLParam } from "../utils/utils";
import { useLocation } from 'react-router-dom';


export default function Block({blockNumber}) {
  const urlParam: URLParam = getURLParam(useLocation().hash);
  const { data, loading, error } = useQuery(BlockDocument, {
    variables: { number: blockNumber }
  }); 

  if (loading) return (
    <>
    </>
  );

  if (error) throw(error)

  const block: Block_ = data!.block as Block_
  const transactions: Transaction_[] = block.transactions as Transaction_[]

  const nav = (e) => {
    e.preventDefault();
    const hash = e.currentTarget.getAttribute("data-hash")
    window.location.hash = `#${urlParam.nab}/${urlParam.oTab}/Transaction/${hash}`
  }


  return (
    <div>
      <div className="px-4 sm:px-0">
        <h3 className="text-base font-semibold leading-7 text-gray-900">Block {block.number}</h3>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500"></p>
      </div>
      <div className="mt-6">
        <dl className="grid grid-cols-1 sm:grid-cols-2">
          <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Timestamp</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">{block.timestamp}</dd>
          </div>
          <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Base Fee Per Gas</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">{block.baseFeePerGas}</dd>
          </div>
          <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Gas Limit</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">{block.gasLimit}</dd>
          </div>
          <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Gas Used</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">{block.gasUsed}</dd>
          </div>
          <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Nonce</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">{block.nonce}</dd>
          </div>
          <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Difficulty</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">{block.difficulty}</dd>
          </div>
          <div className="border-t border-gray-100 px-4 py-6 sm:col-span-2 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Hash</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">{block.hash}</dd>
          </div>
          <div className="border-t border-gray-100 px-4 py-6 sm:col-span-2 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Parent Hash</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">{block.parentHash}</dd>
          </div>
          <div className="border-t border-gray-100 px-4 py-6 sm:col-span-2 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Miner</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">{block.miner}</dd>
          </div>
          <div className="border-t border-gray-100 px-4 py-6 sm:col-span-2 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Extra Data</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">{block.extraData}</dd>
          </div>
        </dl>
      </div>

      <div className="px-4 sm:px-0">
        <h3 className="text-base font-semibold leading-7 text-gray-900">Transactions</h3>
      </div>
      <div className="mt-6">
        <dl className="grid grid-cols-1 sm:grid-cols-1">
        {transactions.map((item, i) => (
          <div key={item.hash} className="border-t border-gray-300 px-4 py-2 sm:col-span-1 sm:px-0">
             <div className="flex space-x-3">
              <div className="flex-shrink-0 text-xl"> 
                {i}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-gray-900">
                    <a href="/#" onClick={nav} data-hash={item.hash}>{item.hash}</a>
                </p>
                <p className="text-sm text-gray-500">
                    from : {item.from}
                </p>
                <hr className="border-gray-200" />
              </div>
            </div>
          </div>
        ))}
        </dl>
      </div>

    </div>
  )
}
