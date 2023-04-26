import { PaperClipIcon } from '@heroicons/react/20/solid'
import Logs from "./Logs";


const tx = {
        "hash": "0x349a325f9efc7a21fd2b9f0efe79a24e516811e6a5a96dabf79e71c466f644cc",
        "blockNumber": "1",
        "chainId": "1",
        "data": "0x608060405234801561001057600080fd5b506127106000819055507fcf78cf0d6f3d8371e1075c69c492ab4ec5d8cf23a1a239b6a51a1d00be7ca312306040516100499190610097565b60405180910390a16100b2565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600061008182610056565b9050919050565b61009181610076565b82525050565b60006020820190506100ac6000830184610088565b92915050565b6101bf806100c16000396000f3fe6080604052600436106100295760003560e01c80633e58c58c1461002e57806367e919b61461004a575b600080fd5b61004860048036038101906100439190610128565b610075565b005b34801561005657600080fd5b5061005f6100bf565b60405161006c919061016e565b60405180910390f35b8073ffffffffffffffffffffffffffffffffffffffff166108fc349081150290604051600060405180830381858888f193505050501580156100bb573d6000803e3d6000fd5b5050565b60005481565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006100f5826100ca565b9050919050565b610105816100ea565b811461011057600080fd5b50565b600081359050610122816100fc565b92915050565b60006020828403121561013e5761013d6100c5565b5b600061014c84828501610113565b91505092915050565b6000819050919050565b61016881610155565b82525050565b6000602082019050610183600083018461015f565b9291505056fea2646970667358221220165d43cad3af5cb99d4bf9da07cfbd57a33bf4f73d4062147f0cc38016b80e2164736f6c63430008120033",
        "from": "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199",
        "gasLimit": "175462",
        "gasPrice": "875000000",
        "maxFeePerGas": "3000000000",
        "maxPriorityFeePerGas": "0",
        "nonce": "0",
        "to": null,
        "type": "2",
        "value": "0",
        "r": "0x16bb87f4169065a9fc035c648c81c0faef20a6a101fc3de6c8139f8e9f0c556b",
        "s": "0x4af1e105e033643772f7e97505c87f956a0b962a0aebb8dbee0500256c9e3291",
        "v": "28"
    }

const txReceipt = {
        "hash": "0x349a325f9efc7a21fd2b9f0efe79a24e516811e6a5a96dabf79e71c466f644cc",
        "blockHash": "0x921ca1ce3bd5b7ae0d33be6554824a2f22e9f8533a85e415b63b310eb962739f",
        "blockNumber": "1",
        "contractAddress": "0x73511669fd4dE447feD18BB79bAFeAC93aB7F31f",
        "cumulativeGasUsed": "175462",
        "from": "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199",
        "gasPrice": "875000000",
        "gasUsed": "175462",
        "index": "0",
        "logsBloom": "0x00000000000000000002000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000080000000400",
        "status": "1",
        "to": null
    }

const logs = [
    {
        "transactionHash": "0x349a325f9efc7a21fd2b9f0efe79a24e516811e6a5a96dabf79e71c466f644cc",
        "transactionIndex": "0",
        "index": "0",
        "blockHash": "0x921ca1ce3bd5b7ae0d33be6554824a2f22e9f8533a85e415b63b310eb962739f",
        "blockNumber": "1",
        "address": "0x73511669fd4dE447feD18BB79bAFeAC93aB7F31f",
        "data": "0x00000000000000000000000073511669fd4de447fed18bb79bafeac93ab7f31f",
        "topics": [
            "0xcf78cf0d6f3d8371e1075c69c492ab4ec5d8cf23a1a239b6a51a1d00be7ca312"
        ]
    }, {
        "transactionHash": "0x349a325f9efc7a21fd2b9f0efe79a24e516811e6a5a96dabf79e71c466f644cc",
        "transactionIndex": "0",
        "index": "0",
        "blockHash": "0x54f9d3b26d2140f3d8e8a0e8c52072a606d5c3e2b131a239e61f9c3e7ed9855c",
        "blockNumber": "2",
        "address": "0xB581C9264f59BF0289fA76D61B2D0746dCE3C30D",
        "data": "0x000000000000000000000000b581c9264f59bf0289fa76d61b2d0746dce3c30d",
        "topics": [
            "0xcf78cf0d6f3d8371e1075c69c492ab4ec5d8cf23a1a239b6a51a1d00be7ca312"
        ]
    }
]

const decodedLogs = [
    {
       "name": "NameRenewed (string name, index_topic_1 bytes32 label, uint256 cost, uint256 expires)",
       "data": {
          "name": "axw",
          "cost": "433378766144034655",
          "expires": "1685624387"
       }
    }, {
       "name": "NameRenewed (string name, index_topic_1 bytes32 label, uint256 cost, uint256 expires)",
       "data": {
          "name": "axw",
          "cost": "433378766144034655",
          "expires": "1685624387"
       }
    }
]

export default function Transaction({data}) {
  return (
    <div>
      <div className="px-4 sm:px-0">
        <h3 className="text-base font-semibold leading-7 text-gray-900">Transaction Details</h3>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">0x8c66c3a1b634f4d54449ba3f9c49d613be63b2293016f3c5882b90eb8aaa082d</p>
      </div>
      <div className="mt-6">
        <dl className="grid grid-cols-1 sm:grid-cols-2">
          <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Nonce</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">{data.tx.nonce}</dd>
          </div>
          <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Index (Receipt)</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">{data.txReceipt.index}</dd>
          </div>
          <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Type</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">{data.tx.type}</dd>
          </div>
          <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Block Number</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">{data.tx.blockNumber}</dd>
          </div>
          <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Chain Id</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">{data.tx.chainId}</dd>
          </div>
          <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Gas Limit</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">{data.tx.gasLimit}</dd>
          </div>
          <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Gas Price</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">{data.tx.gasPrice}</dd>
          </div>
          <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Max Fee Per Gas</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">{data.tx.maxFeePerGas}</dd>
          </div>
          <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Max Priority Fee Per Gas</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">{data.tx.maxFeePerGas}</dd>
          </div>
          <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Cumulative Gas Used (Receipt)</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">{data.txReceipt.cumulativeGasUsed}</dd>
          </div>
          <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">To</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">{data.tx.to}</dd>
          </div>
          <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Value</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">{data.tx.value}</dd>
          </div>
          <div className="border-t border-gray-100 px-4 py-6 sm:col-span-2 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">From</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">{data.tx.from}</dd>
          </div>
          <div className="border-t border-gray-100 px-4 py-6 sm:col-span-2 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Contract Address (Receipt)</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">{data.txReceipt.contractAddress}</dd>
          </div>
          <div className="border-t border-gray-100 px-4 py-6 sm:col-span-2 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">r</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">{data.tx.r}</dd>
          </div>
          <div className="border-t border-gray-100 px-4 py-6 sm:col-span-2 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">s</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">{data.tx.s}</dd>
          </div>
          <div className="border-t border-gray-100 px-4 py-6 sm:col-span-2 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">v</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">{data.tx.v}</dd>
          </div>
          <div className="border-t border-gray-100 px-4 py-6 sm:col-span-2 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Data</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2 override-break-word">
              {data.tx.data}
            </dd>
          </div>
          <div className="border-t border-gray-100 px-4 py-6 sm:col-span-2 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">logs Bloom (Receipt)</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2 override-break-word">
              {data.txReceipt.logsBloom}
            </dd>
          </div>
          {/*<div className="border-t border-gray-100 px-4 py-6 sm:col-span-2 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Attachments</dt>
            <dd className="mt-2 text-sm text-gray-900">
              <ul role="list" className="divide-y divide-gray-100 rounded-md border border-gray-200">
                <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                  <div className="flex w-0 flex-1 items-center">
                    <div className="ml-4 flex min-w-0 flex-1 gap-2">
                      <span className="truncate font-medium">resume_back_end_developer.pdf</span>
                    </div>
                  </div>
                </li>
                <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                  <div className="flex w-0 flex-1 items-center">
                    <div className="ml-4 flex min-w-0 flex-1 gap-2">
                      <span className="truncate font-medium">coverletter_back_end_developer.pdf</span>
                    </div>
                  </div>
                </li>
              </ul>
            </dd>
          </div>*/}
        </dl>
      </div>

      <Logs data={data.logs} />

    </div>
  )
}
