import { BellIcon } from '@heroicons/react/24/outline'
import Accounts from "../../components/Accounts"
import Contracts from "../../components/Contracts"
import Transaction from "../../components/Transaction"
import Tabs from "../../components/tailwindui/Tabs"
import Comboboxes from "../../components/tailwindui/Comboboxes"
import { classNames } from "../../utils/utils"
import { useAppSelector, useAppDispatch } from '../../appContext/hooks';



const tabs = [
    { name: 'EOAs', href: '#', current: true },
    { name: 'Contracts', href: '#', current: false },
    { name: 'Transactions', href: '#', current: false },
    { name: 'Blocks', href: '#', current: false },
]

export default function Overview() {

  const dispatch = useAppDispatch();

  let state;
  dispatch((dispatch, getState) => state = getState());

  if (!state) throw (new Error("NULL_STATE"));
  if (!state.app) throw (new Error("NULL_APP_STATE"));

  const accounts = state.app.accounts;
  
  const contracts = [
      { address: '0x283af0b28c62c092c9727f1ee09c02ca627eb7f5', balance: '1000000' },
      { address: '0x283af0b28c62c092c9727f1ee09c02ca627eb7f5', balance: '1000000' },
      { address: '0x283af0b28c62c092c9727f1ee09c02ca627eb7f5', balance: '1000000' },
      { address: '0x283af0b28c62c092c9727f1ee09c02ca627eb7f5', balance: '1000000' },
      { address: '0x283af0b28c62c092c9727f1ee09c02ca627eb7f5', balance: '1000000' },
      { address: '0x283af0b28c62c092c9727f1ee09c02ca627eb7f5', balance: '1000000' },
      { address: '0x283af0b28c62c092c9727f1ee09c02ca627eb7f5', balance: '1000000' },
      { address: '0x283af0b28c62c092c9727f1ee09c02ca627eb7f5', balance: '1000000' },
      { address: '0x283af0b28c62c092c9727f1ee09c02ca627eb7f5', balance: '1000000' },
      { address: '0x283af0b28c62c092c9727f1ee09c02ca627eb7f5', balance: '1000000' },
      { address: '0x283af0b28c62c092c9727f1ee09c02ca627eb7f5', balance: '1000000' },
      { address: '0x283af0b28c62c092c9727f1ee09c02ca627eb7f5', balance: '1000000' },
      { address: '0x283af0b28c62c092c9727f1ee09c02ca627eb7f5', balance: '1000000' }
  ]

  const transaction = {
      tx: {
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
        },
        txReceipt: {
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
        },
        logs: {
            logs: [
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
          ],
          decodedLogs: [
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
        }
    }
  

  return (
     <>
       <div className="position-relative mx-auto w-full grow lg:flex xl:px-2">
          {/* Left sidebar & main wrapper */}
          <div className="flex-1 w-1/2 full-screen-height-left scrollable">
            <div className="sticky top-0 z-50 px-4 sm:px-6 lg:pl-8 xl:flex-1 xl:pl-6">
              <Tabs tabs={tabs} />
            </div>
            <div className="px-4 py-6 sm:px-6 lg:pl-8 xl:flex-1 xl:pl-6">
              <Accounts data={accounts} />
            </div>
            <div className="px-4 py-6 sm:px-6 lg:pl-8 xl:flex-1 xl:pl-6">
              <Contracts data={contracts}/>
            </div>
          </div>
          <div className="scrollable full-screen-height-right shrink-0 border-t border-gray-200 px-4 py-6 sm:px-6 w-1/2 lg:border-l lg:border-t-0 lg:pr-8 xl:pr-6">
            <div className="">
              <Transaction data={transaction} />
            </div>
          </div>
        </div>
      </>
  )
}
