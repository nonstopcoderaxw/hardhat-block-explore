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
  		contract(address: "0xB581C9264f59BF0289fA76D61B2D0746dCE3C30D") {
    	address
  		}
	}
`

const searchTransaction = `
	query searchTransaction {
	  transaction(hash: "0xb4c3dc78e5dc9ddecf16707c489fab6dd666f725fe9b523efafaa49e6b6c6071") {
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

