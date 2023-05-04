import { ContractDocument, Account as Account_, Transaction as Transaction_ } from "../graphql/generated";
import { useQuery } from "@apollo/client";
import { getURLParam, URLParam } from "../utils/utils";
import { useLocation } from 'react-router-dom';
import Comboboxes from "./tailwindui/Comboboxes"
import Alert from "./tailwindui/alert"
import { useState } from 'react'
import { useAppSelector } from '../appContext/hooks'
import { selectAppState } from "../appContext/appContextSlice"
import { Abi } from "../utils/abi"

export default function Contract({address}) {

    let _appState = useAppSelector(selectAppState);
    if (!_appState) throw (new Error("NULL_APP_STATE"));
    const [ contractAddress, setContractAddress ] = useState(address);
    const [ implAddress, setImplAddress ] = useState(address);
    
    const urlParam: URLParam = getURLParam(useLocation().hash);

    var { data, loading, error } = useQuery(ContractDocument, {
      variables: { address: address }
    }); 

    var { data: data1, loading: loading1, error: error1 } = useQuery(ContractDocument, {
      variables: { address: implAddress }
    }); 

    //if (loading || loading1) return null;

    if (error) throw(error)
    if (error1) throw(error1)
    
    const contract: Account_ = data!.contract as Account_
    const implContract: Account_ = data1!.contract as Account_

    const contracts: Account_[] = _appState.contracts as Account_[];

    const proxyComboboxesItems: string[] = [];
    for (let i = 0; i < contracts.length; i++) {
      proxyComboboxesItems.push(contracts[i].address)
    }

    const implComboboxesItems = proxyComboboxesItems;

    const comboboxesOnChangeHandler = {
      proxy: (address) => {
        setContractAddress(address)
        window.location.hash = `#${urlParam.nab}/${urlParam.oTab}/Contract/${address}/${urlParam.implId}/${urlParam.fIndex}/${urlParam.frBN}/${urlParam.toBN}`;
      },
      implementation: (address) => {
        console.log(address)
        setImplAddress(address)
        // var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?myNewUrlQuery=1';
        // window.history.pushState({path:newurl},'',newurl);

        //window.location.hash = `#${urlParam.nab}/${urlParam.oTab}/Contract/${urlParam.oId}/${address}/`
      },
      function: (item) => {
        const fIndex = funcAbiMinimal.findIndex(element => element === item);
        inputs = funcAbiJson[fIndex].inputs;
        window.location.hash = `#${urlParam.nab}/${urlParam.oTab}/Contract/${urlParam.oId}/${urlParam.implId}/${fIndex}`
      }
    }

    var funcAbis;
    var funcAbiMinimal;
    var funcAbiJson;
    var funcComboboxesDefault;
    var inputs;

    if (implContract.abi) {
      const abi = new Abi(implContract.abi);
      funcAbis = abi.getFunctions();
      funcAbiMinimal = funcAbis.minimal;
      funcAbiJson = funcAbis.json;

      funcComboboxesDefault = [ undefined, null, "null" ].includes(urlParam.fIndex) ? funcAbiMinimal[0] : funcAbiMinimal[Number(urlParam.fIndex)];
      inputs = !inputs ? funcAbiJson[0].inputs : inputs;
    }
    

    return (
      <>
        <div>
          <div className="px-4 sm:px-0">
             <h3 className="text-base font-semibold leading-7 text-gray-900">Contract</h3>
          </div>
        </div>
        <div className="mt-6">
          <dl className="grid grid-cols-1 sm:grid-cols-3">
            <div className="border-t border-gray-100 px-4 py-6 sm:col-span-2 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">proxy</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">             
                <Comboboxes items={proxyComboboxesItems} defaultItem={contract.address} onChange={comboboxesOnChangeHandler.proxy} />
              </dd>
            </div>
          </dl>
          <dl className="grid grid-cols-1 sm:grid-cols-3">
            <div className="border-t border-gray-100 px-4 py-6 sm:col-span-2 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">implementation</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">             
                <Comboboxes items={implComboboxesItems} defaultItem={implContract.address} onChange={comboboxesOnChangeHandler.implementation} />
              </dd>
            </div>
          </dl>
          {implContract.abi ? 
            (<>
              <dl className="grid grid-cols-1 sm:grid-cols-3">
                <div className="border-t border-gray-100 px-4 py-6 sm:col-span-3 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">function</dt>
                  <Comboboxes items={funcAbiMinimal} defaultItem={funcComboboxesDefault} onChange={comboboxesOnChangeHandler.function} />
                </div>
              </dl>
              <dl className="grid grid-cols-1 sm:grid-cols-2">
                <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">from</dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2"><input
                      placeholder="block number"
                      type="number"
                      name="from-blocknumber"
                      id="from-blocknumber"
                      className="block w-2/5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    /></dd>
                </div>
                <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">to</dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2"><input
                      placeholder="block number"
                      type="number"
                      name="to-blocknumber"
                      id="to-blocknumber"
                      className="block w-2/5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    /></dd>
                </div>
                {inputs.map((input) => {
                    return (
                      <div key={input.name} className="border-t border-gray-100 px-4 py-6 sm:col-span-2 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">{input.name} ({input.type})</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
                        <input
                            placeholder=""
                            type={input.type.includes("int") ? "number" : "text"}
                            name={input.name}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          /></dd>
                      </div>
                    )
                })}
                
              </dl>
            </>) : (<Alert message="ABI Not Found!" type="warn" />)
          }
        </div>
      </>
  )
}



      
