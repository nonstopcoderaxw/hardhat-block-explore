import axios from "axios";

const endpoint = "http://localhost:4001";

describe("index.test.ts", () => {
	
	beforeAll(async () => {

	});

	test('#allFields', async () => {
		const res = await axios.post("http://localhost:4001", { query: allFields }, { headers: { 'Content-Type': 'application/json' } });
		expect(res.data).not.toHaveProperty("errors");
	});

	test('#searchAccount', async () => {
		const res = await axios.post("http://localhost:4001", { query: searchAccount }, { headers: { 'Content-Type': 'application/json' } });
		expect(res.data).not.toHaveProperty("errors");	});

	test('#searchContract', async () => {
		const res = await axios.post("http://localhost:4001", { query: searchContract }, { headers: { 'Content-Type': 'application/json' } });
		expect(res.data).not.toHaveProperty("errors");	
	});

	test('#searchTransaction', async () => {
		const res = await axios.post("http://localhost:4001", { query: searchTransaction }, { headers: { 'Content-Type': 'application/json' } });
		expect(res.data).not.toHaveProperty("errors");	
	});

	test('#searchBlock', async () => {
		const res = await axios.post("http://localhost:4001", { query: searchBlock }, { headers: { 'Content-Type': 'application/json' } });
		expect(res.data).not.toHaveProperty("errors");	
	});

  test('#importABIs', async () => {
    const res = await axios.post("http://localhost:4001", { query: importABIs }, { headers: { 'Content-Type': 'application/json' } });
    expect(res.data).not.toHaveProperty("errors");  
  });
})


const allFields = `query allFields {
  accounts {
    address
    balance
    isContract
    transactions {
      blockNumber
      chainId
      data
      from
      gasLimit
      gasPrice
      hash
      maxFeePerGas
      maxPriorityFeePerGas
      nonce
      r
      s
      to
      type
      v
      value
      transactionReceipt {
        blockHash
        blockNumber
        contractAddress
        cumulativeGasUsed
        from
        gasPrice
        gasUsed
        hash
        index
        logsBloom
        status
        to
        logs {
          address
          blockHash
          blockNumber
          data
          index
          topics
          transactionHash
          transactionIndex
        }
      }
    }
  }
}
`

const searchAccount = `
	query searchAccount {
  		account(address: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266") {
    	address
  	}
}
`

const searchContract = `
	query searchContract {
  		contract(address: "0xb09da8a5B236fE0295A345035287e80bb0008290") {
    	address
  		}
	}
`

const searchTransaction = `
	query searchTransaction {
	  transaction(hash: "0x349a325f9efc7a21fd2b9f0efe79a24e516811e6a5a96dabf79e71c466f644cc") {
	    hash
	  }
	}
`

const searchBlock = `
	query searchBlock {
	  block(number: "1") {
	    number
	  }
	}
`

const importABIs = `
  mutation abi {
    importABIs(
      addresses: [
        "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC",
        "0x6B175474E89094C44Da98b954EedeAC495271d0F"
      ], 
      names: [ "name1", "name2" ],
      abis: [ "abi1", "abi2" ]
    ) {
      status
    }
  }
`

