import Comboboxes from "./components/tailwindui/Comboboxes"
import Nav from "./components/tailwindui/Nav"
import Tabs from "./components/tailwindui/Tabs"
import Accounts from "./components/Accounts"
import Contracts from "./components/Contracts"
import Logs from "./components/Logs"
import Transaction from "./components/Transaction"
import { Provider } from 'react-redux';
import { store } from './appContext/store';

const onChangeHandler = data => console.log(data);

const data = {
	Comboboxes: {
		accounts: [ 
			{ address: "0x283af0b28c62c092c9727f1ee09c02ca627eb7f5" },
			{ address: "0x283af0b28c62c092c9727f1ee09c02ca627eb7f1" } 
		]
	},

	Nav: {
		RightItem: (()=><Comboboxes accounts={data.Comboboxes.accounts} />),
		LogoImg: (() => <img className="h-8 w-auto" src="./logo.png" alt="Log" />),
		navs: [
		  { name: 'Overview', href: '/overview', current: true },
		  { name: 'Contracts', href: '#', current: false },
		  { name: 'ABIs', href: '#', current: false },
		  { name: 'Utilities', href: '#', current: false }
		]
	},

	Tabs: {
		tabs: [
		  { name: 'EOAs', href: '#', current: true },
		  { name: 'Contracts', href: '#', current: false },
		  { name: 'Transactions', href: '#', current: false },
		  { name: 'Blocks', href: '#', current: false },
		]
	},

	Accounts: {
		data: [
		  { address: '0x283af0b28c62c092c9727f1ee09c02ca627eb7f5', balance: '1000000', numOfTxs: "10" },
		  { address: '0x283af0b28c62c092c9727f1ee09c02ca627eb7f1', balance: '1000000', numOfTxs: "10" },
		  { address: '0x283af0b28c62c092c9727f1ee09c02ca627eb7f2', balance: '1000000', numOfTxs: "10" },
		  { address: '0x283af0b28c62c092c9727f1ee09c02ca627eb7f3', balance: '1000000', numOfTxs: "10" },
		  { address: '0x283af0b28c62c092c9727f1ee09c02ca627eb7f4', balance: '1000000', numOfTxs: "10" },
		  { address: '0x283af0b28c62c092c9727f1ee09c02ca627eb7f5', balance: '1000000', numOfTxs: "10" },
		  { address: '0x283af0b28c62c092c9727f1ee09c02ca627eb7f6', balance: '1000000', numOfTxs: "10" },
		  { address: '0x283af0b28c62c092c9727f1ee09c02ca627eb7f7', balance: '1000000', numOfTxs: "10" },
		  { address: '0x283af0b28c62c092c9727f1ee09c02ca627eb7f8', balance: '1000000', numOfTxs: "10" },
		  { address: '0x283af0b28c62c092c9727f1ee09c02ca627eb7f9', balance: '1000000', numOfTxs: "10" },
		]
	},

	Contracts: {
		data: [
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
	},
	Logs: {
		data: {
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
			],

			decodedLogs: [
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
		}
	},
	Transaction: {
		data: {
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
	}
}

export default function AppTest () {
	return (
		<>
			<div className="scrollable full-screen-height-left">
				<Provider store={store}>
					<Comboboxes accounts={data.Comboboxes.accounts} /><br/><br/><br/>
					<Nav navs={data.Nav.navs} RightItem={data.Nav.RightItem} LogoImg={data.Nav.LogoImg} /><br/><br/><br/>
					<Tabs tabs={data.Tabs.tabs} /><br/><br/><br/>
					<Accounts data={data.Accounts.data} /><br/><br/><br/>
					<Contracts data={data.Contracts.data} /><br/><br/><br/>
					<Logs data={data.Logs.data} /><br/><br/><br/>
					<Transaction data={data.Transaction.data} /><br/><br/><br/>
				</Provider>
			</div>
		</>
	);
}