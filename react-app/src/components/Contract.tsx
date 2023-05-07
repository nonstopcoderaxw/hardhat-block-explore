import { ContractDocument, Account as Account_, Transaction as Transaction_ } from "../graphql/generated";
import { useQuery } from "@apollo/client";
import { getURLParam, URLParam } from "../utils/utils";
import { useLocation } from 'react-router-dom';
import Comboboxes, { UIComboboxesInput } from "./tailwindui/Comboboxes"
import Alert from "./tailwindui/Alert"
import { useState, useEffect} from 'react'
import { useAppSelector } from '../appContext/hooks'
import { selectAppState } from "../appContext/appContextSlice"
import { Abi, Function} from "../utils/abi"
import { Address } from "../utils/Address";


export type UIContractInput = {
  address: string | null,
  implAddress: string | null,
  selectedFuncIndex: number | null
}

type UICallParam = {
  name: string | undefined ,
  type: string | undefined
}

type UIImplContract = {
  hasABI: boolean
}

export type UIContractOuput = {
  Comboboxes: {
    contract: UIComboboxesInput,
    implContract: UIComboboxesInput,
    funcs: UIComboboxesInput
  },
  uiimplContract: UIImplContract,
  selectedFuncIndex: Number | null,
  inputs: UICallParam[]
}

export default function Contract({address, implAddress, selectedFuncIndex, contractAddress_, setContractAddress, query, setQuery, selected, setSelected}) {

    address = (address && address != null) ? (new Address(address)).value : null;
    implAddress = (implAddress && implAddress != null) ? (new Address(implAddress)).value : null;
    if (selectedFuncIndex && (typeof selectedFuncIndex) === "number") throw ("selectedFuncIndex input type error");

    let _appState = useAppSelector(selectAppState);
    if (!_appState) throw (new Error("NULL_APP_STATE"));
    const urlParam: URLParam = _appState.urlParam;
    //[ contractAddress_, setContractAddress ] = useState(address);
    const [ implAddress_, setImplAddress ] = useState(implAddress);
    const [ selectedFuncIndex_, setSelectedFuncIndex ] = useState(Number(selectedFuncIndex));

    const { data: gqlData0, loading: gqlLoading0, error: gqlError0 } = useQuery(ContractDocument, {
      variables: { address: contractAddress_ as string },
      skip: !address || address == null 
    }); 

    const { data: gqlData1, loading: gqlLoading1, error: gqlError1 } = useQuery(ContractDocument, {
      variables: { address: implAddress_ as string },
      skip: !implAddress_ || implAddress_ == null 
    }); 

    if (gqlError0) throw(gqlError0)
    if (gqlError1) throw(gqlError1)

    const contract: Account_ | null = gqlData0 ? gqlData0!.contract as Account_ : null
    const implContract: Account_ | null = gqlData1 ? gqlData1!.contract as Account_ : null
    const contracts: Account_[] = _appState.contracts as Account_[];

    const proxyComboboxesItems: string[] = [];
    for (let i = 0; i < contracts.length; i++) {
      proxyComboboxesItems.push(contracts[i].address)
    }

    const implComboboxesItems = proxyComboboxesItems;

    const comboboxesOnChangeHandler = {
      proxy: (address) => {
        setContractAddress(address)
        const bookmark = `${window.location.protocol}//${window.location.host}${window.location.pathname}#${urlParam.nab}/${urlParam.oTab}/Contract/${address}/${urlParam.implId}/${urlParam.fIndex}/${urlParam.frBN}/${urlParam.toBN}`;
        window.history.pushState({ path: bookmark }, '', bookmark);
      },
      implementation: (address) => {
        setImplAddress(address);
        setSelectedFuncIndex(0);
        const bookmark = `${window.location.protocol}//${window.location.host}${window.location.pathname}#${urlParam.nab}/${urlParam.oTab}/Contract/${urlParam.oId}/${address}`;
        window.history.pushState({ path: bookmark }, '', bookmark);
      },
      function: (item) => {
        const fIndex = funcAbiMinimal.findIndex(element => element === item);
        setSelectedFuncIndex(fIndex);
        const bookmark = `${window.location.protocol}//${window.location.host}${window.location.pathname}#${urlParam.nab}/${urlParam.oTab}/Contract/${urlParam.oId}/${urlParam.implId}/${fIndex}`;
        window.history.pushState({ path: bookmark }, '', bookmark);
      }
    }

    const hasABI: boolean = (implContract && implContract.abi) ? true : false
    var funcAbiMinimal: string[] = [];
    var funcComboboxesDefault: string | null = null;
    const uiinputs: UICallParam[] = [];

    if (implContract && hasABI) {
        const abi: Abi = new Abi(implContract.abi as string);
        const funcAbis: Function = abi.getFunctions();
        funcAbiMinimal = funcAbis.minimal;
        const funcAbiJson = funcAbis.json;

        funcComboboxesDefault = funcAbiMinimal[selectedFuncIndex_];
        const inputs = funcAbiJson[selectedFuncIndex_].inputs;
        if (inputs) {
          inputs.map((input) => {
            uiinputs.push({
              name: input.name,
              type: input.type
            })
          })
        }
    }

    const uicomboboxesContract: UIComboboxesInput = {
      items: proxyComboboxesItems,
      defaultItem: contractAddress_,
      onChange: comboboxesOnChangeHandler.proxy,
      _query: { value: query, setter: setQuery },
      _selected: { value: selected, setter: setSelected }
    }

    const uicomboboxesImpl: UIComboboxesInput = {
      items: implComboboxesItems,
      defaultItem: implAddress_,
      onChange: comboboxesOnChangeHandler.implementation
    }

    const funcs: UIComboboxesInput = {
      items: funcAbiMinimal,
      defaultItem: funcComboboxesDefault,
      onChange: comboboxesOnChangeHandler.function
    }

    const uiimplContract: UIImplContract = {
      hasABI: hasABI
    }

    const uidata: UIContractOuput = {
      Comboboxes: {
        contract: uicomboboxesContract,
        implContract: uicomboboxesImpl,
        funcs: funcs
      },
      uiimplContract: uiimplContract,
      selectedFuncIndex: selectedFuncIndex_,
      inputs: uiinputs
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
                <Comboboxes items={uidata.Comboboxes.contract.items} defaultItem={uidata.Comboboxes.contract.defaultItem} onChange={uidata.Comboboxes.contract.onChange} _query={uicomboboxesContract._query} _selected={uicomboboxesContract._selected}/>
              </dd>
            </div>
          </dl>
          <dl className="grid grid-cols-1 sm:grid-cols-3">
            <div className="border-t border-gray-100 px-4 py-6 sm:col-span-2 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">implementation</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">             
                <Comboboxes items={uidata.Comboboxes.implContract.items} defaultItem={uidata.Comboboxes.implContract.defaultItem} onChange={uidata.Comboboxes.implContract.onChange} />
              </dd>
            </div>
          </dl>
          {uidata.uiimplContract.hasABI ? 
            (<>
              <dl className="grid grid-cols-1 sm:grid-cols-3">
                <div className="border-t border-gray-100 px-4 py-6 sm:col-span-3 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">function</dt>
                  <Comboboxes items={uidata.Comboboxes.funcs.items} defaultItem={uidata.Comboboxes.funcs.defaultItem} onChange={uidata.Comboboxes.funcs.onChange} />
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
                {uidata.inputs.map((input) => {
                    return (
                      <div key={input.name} className="border-t border-gray-100 px-4 py-6 sm:col-span-2 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">{input.name} ({input.type})</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
                        <input
                            placeholder=""
                            type={input.type?.includes("int") ? "number" : "text"}
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



      
