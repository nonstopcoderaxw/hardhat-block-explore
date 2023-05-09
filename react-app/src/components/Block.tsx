import { BlockDocument, Block as Block_, Transaction as Transaction_ } from "../graphql/generated";
import { useQuery } from "@apollo/client";
import { getURLParam, URLParam, State } from "../utils/utils";
import { useState, useEffect, useMemo } from "react"

export type BlockInputs = {
  defaultBlockNumber: number | null
  onClick: (hash) => void
  exportState?: (state: BlockState) => void
}

export type BlockState = {
  blockNumber: State<number | null> | null
}

type BlockOutputs = {
  number: number | null,
  timestamp: number | null,
  baseFeePerGas: string | null,
  gasLimit: string | null,
  gasUsed: string | null,
  nonce: number | null,
  difficulty: string | null,
  hash: string | null,
  parentHash: string | null,
  miner: string | null,
  extraData: string | null,
  transactions: Transaction[]
}

type Transaction = {
  hash: string,
  from: string
}

export default function Block({defaultBlockNumber, onClick, exportState}: BlockInputs) {
  const [ blockNumber, setBlockNumber ] = useState<number | null>(defaultBlockNumber);
  
  const state: BlockState = useMemo(() => {
    return { blockNumber: [ blockNumber, setBlockNumber ] }
  }, [blockNumber, setBlockNumber])

  const { data: gqlData, loading, error } = useQuery(BlockDocument, {
    variables: { number: (blockNumber as number).toString() },
    skip: blockNumber === null
  }); 

  if (!loading && error) throw(error)

  const blockoutputs: BlockOutputs = {
    number: null,
    timestamp: null,
    baseFeePerGas: null,
    gasLimit: null,
    gasUsed: null,
    nonce: null,
    difficulty: null,
    hash: null,
    parentHash: null,
    miner: null,
    extraData: null,
    transactions: []
  }

  if (gqlData) {
    const block: Block_ = gqlData.block as Block_
    const transactions: Transaction_[] = block.transactions as Transaction_[]
    blockoutputs.number = Number(block.number);
    blockoutputs.timestamp = block.timestamp;
    blockoutputs.baseFeePerGas = block.baseFeePerGas;
    blockoutputs.gasLimit = block.gasLimit;
    blockoutputs.gasUsed = block.gasUsed;
    blockoutputs.nonce = block.nonce;
    blockoutputs.difficulty = block.difficulty;
    blockoutputs.hash = block.hash;
    blockoutputs.parentHash = block.parentHash;
    blockoutputs.miner = block.miner;
    blockoutputs.extraData = block.extraData;
    blockoutputs.transactions = transactions.map((item) => {
      return { hash: item.hash, from: item.from }
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

  useEffect(()=> {
    if (exportState) exportState(state);
  }, [state, exportState])


  return (
    <div>
      <div className="px-4 sm:px-0">
        <h3 className="text-base font-semibold leading-7 text-gray-900">Block {blockoutputs.number}</h3>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500"></p>
      </div>
      <div className="mt-6">
        <dl className="grid grid-cols-1 sm:grid-cols-2">
          <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Timestamp</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">{blockoutputs.timestamp}</dd>
          </div>
          <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Base Fee Per Gas</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">{blockoutputs.baseFeePerGas}</dd>
          </div>
          <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Gas Limit</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">{blockoutputs.gasLimit}</dd>
          </div>
          <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Gas Used</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">{blockoutputs.gasUsed}</dd>
          </div>
          <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Nonce</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">{blockoutputs.nonce}</dd>
          </div>
          <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Difficulty</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">{blockoutputs.difficulty}</dd>
          </div>
          <div className="border-t border-gray-100 px-4 py-6 sm:col-span-2 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Hash</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">{blockoutputs.hash}</dd>
          </div>
          <div className="border-t border-gray-100 px-4 py-6 sm:col-span-2 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Parent Hash</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">{blockoutputs.parentHash}</dd>
          </div>
          <div className="border-t border-gray-100 px-4 py-6 sm:col-span-2 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Miner</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">{blockoutputs.miner}</dd>
          </div>
          <div className="border-t border-gray-100 px-4 py-6 sm:col-span-2 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Extra Data</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">{blockoutputs.extraData}</dd>
          </div>
        </dl>
      </div>

      <div className="px-4 sm:px-0">
        <h3 className="text-base font-semibold leading-7 text-gray-900">Transactions</h3>
      </div>
      <div className="mt-6">
        <dl className="grid grid-cols-1 sm:grid-cols-1">
        {blockoutputs.transactions.map((item, i) => (
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
