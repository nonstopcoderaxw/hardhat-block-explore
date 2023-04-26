import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { CodeBracketIcon, EllipsisVerticalIcon, FlagIcon, StarIcon } from '@heroicons/react/20/solid'
import { classNames } from "../utils/utils"


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
  },
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
  }
]

const decodedLogs = [
  {
   "name": "NameRenewed (string name, index_topic_1 bytes32 label, uint256 cost, uint256 expires)",
   "data": {
      "name": "axw",
      "cost": "433378766144034655",
      "expires": "1685624387"
    },
  }, {
   "name": "NameRenewed (string name, index_topic_1 bytes32 label, uint256 cost, uint256 expires)",
   "data": {
      "name": "axw",
      "cost": "433378766144034655",
      "expires": "1685624387"
    }
  }
]  

export default function Logs({data}) {
  return (
    <>
      <div className="px-4 sm:px-0">
        <h3 className="text-base font-semibold leading-7 text-gray-900">Logs</h3>
      </div>
      <div className="mt-6">
        <dl className="grid grid-cols-1 sm:grid-cols-1">
        {data.logs.map((item, i) => (
          <div className="border-t border-gray-300 px-4 py-2 sm:col-span-1 sm:px-0">
             <div className="flex space-x-3">
              <div className="flex-shrink-0 text-xl"> 
                {i}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-gray-900">
                    {item.address}
                </p>
                <p className="text-sm text-gray-500">
                  {data.decodedLogs[i].name}
                </p>
                <hr className="border-gray-200" />
                <p className="text-sm text-gray-500">
                  {Object.keys(data.decodedLogs[i].data).map((item) => (
                    <>
                    {item}: {data.decodedLogs[i].data[item]} <br/>
                    </>
                  ))}
                </p>
              </div>
            </div>
          </div>
        ))}
        </dl>
      </div>
    </>
  )
}