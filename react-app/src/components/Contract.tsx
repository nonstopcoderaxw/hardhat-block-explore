import { ContractDocument, Account as Account_} from "../graphql/generated";
import { useQuery } from "@apollo/client";
import { getURLParam, URLParam, State } from "../utils/utils";
import Comboboxes, { ComboboxesInputs, ComboboxesState} from "./tailwindui/Comboboxes"
import Alert from "./tailwindui/Alert"
import { useState, useEffect, useMemo } from 'react'
import { useAppSelector } from '../appContext/hooks'
import { selectAppState } from "../appContext/appContextSlice"
import { Abi, Function } from "../utils/abi"
import { Address } from "../utils/Address";

export type ContractInputs = {
  defaultContractAddress: string | null,
  defaultImplAddress: string | null,
  defaultSelectedFuncIndex: number | null,
  exportState?: (state: ContractState) => void
}

type CallParam = {
  name: string | undefined,
  type: string | undefined
}

export type ContractOuputs = {
  contractInputs: ComboboxesInputs
  implContractInputs: ComboboxesInputs,
  hasImplContractABI: boolean
  funcsInputs: ComboboxesInputs,
  selectedFuncIndexInputs: Number | null,
  callParams: CallParam[]
}

export type ContractState = {
  contractAddress: State<string | null> | null,
  implAddress: State<string | null> | null, 
  selectedFuncIndex: State<number | null> | null,
  contractComboboxes: ComboboxesState | null,
  implContractComboboxes: ComboboxesState | null,
  funcsComboboxes: ComboboxesState | null
}

export default function Contract({defaultContractAddress, defaultImplAddress, defaultSelectedFuncIndex, exportState}: ContractInputs) {

    defaultContractAddress = (defaultContractAddress && defaultContractAddress != null) ? (new Address(defaultContractAddress)).value : null;
    defaultImplAddress = (defaultImplAddress && defaultImplAddress != null) ? (new Address(defaultImplAddress)).value : null;
    if (defaultSelectedFuncIndex && (typeof defaultSelectedFuncIndex) === "number") throw (new Error("defaultSelectedFuncIndex input type error"));

    let _appState = useAppSelector(selectAppState);
    if (!_appState) throw (new Error("NULL_APP_STATE"));
    
    const [ contractAddress, setContractAddress ] = useState<string | null>(defaultContractAddress);
    const [ implAddress, setImplAddress ] = useState<string | null>(defaultImplAddress);
    const [ selectedFuncIndex, setSelectedFuncIndex ] = useState<number | null>(Number(defaultSelectedFuncIndex));

    const exportStateHandler = {
      contractComboboxes: (comboboxesState: ComboboxesState) => {
        state.contractComboboxes = comboboxesState
      },
      implContractComboboxes: (comboboxesState: ComboboxesState) => {
        state.implContractComboboxes = comboboxesState
      },
      funcsComboboxes: (comboboxesState: ComboboxesState) => {
        state.funcsComboboxes = comboboxesState
      },
    }

    // const { data: gqlData0, loading: gqlLoading0, error: gqlError0 } = useQuery(ContractDocument, {
    //   variables: { address: contractAddress as string },
    //   skip: !contractAddress || contractAddress == null 
    // }); 

    const { data: gqlData, loading: gqlLoading, error: gqlError } = useQuery(ContractDocument, {
      variables: { address: implAddress as string },
      skip: !implAddress || implAddress == null 
    }); 

    if (!gqlLoading && gqlError) throw(gqlError)

    const state: ContractState = useMemo(() => {
      return {
        contractAddress: [ contractAddress, setContractAddress ],
        implAddress: [ implAddress, setImplAddress ], 
        selectedFuncIndex: [ selectedFuncIndex, setSelectedFuncIndex ],
        contractComboboxes: null,
        implContractComboboxes: null,
        funcsComboboxes: null
      }
    }, [contractAddress, setContractAddress, implAddress, setImplAddress, selectedFuncIndex, setSelectedFuncIndex])

    //const contract: Account_ | null = gqlData0 ? gqlData0!.contract as Account_ : null
    const implContract: Account_ | null = gqlData ? gqlData!.contract as Account_ : null
    const contracts: Account_[] = _appState.contracts as Account_[];

    const proxyComboboxesItems: string[] = [];
    for (let i = 0; i < contracts.length; i++) {
      proxyComboboxesItems.push(contracts[i].address)
    }
    const implComboboxesItems = proxyComboboxesItems;

    const comboboxesOnChangeHandler = {
      proxy: (address) => {
        const urlParam: URLParam = getURLParam(window.location.hash);
        const bookmark = `${window.location.protocol}//${window.location.host}${window.location.pathname}#${urlParam.nab}/${urlParam.oTab}/Contract/${address}/${urlParam.implId}/${urlParam.fIndex}/${urlParam.frBN}/${urlParam.toBN}`;
        window.history.pushState({ path: bookmark }, '', bookmark);
      },
      implementation: (address) => {
        setImplAddress(address);
        setSelectedFuncIndex(0);
        const urlParam: URLParam = getURLParam(window.location.hash);
        const bookmark = `${window.location.protocol}//${window.location.host}${window.location.pathname}#${urlParam.nab}/${urlParam.oTab}/Contract/${urlParam.oId}/${address}`;
        window.history.pushState({ path: bookmark }, '', bookmark);
      },
      function: (item) => {
        const fIndex = funcAbiMinimal.findIndex(element => element === item);
        setSelectedFuncIndex(fIndex);
        const urlParam: URLParam = getURLParam(window.location.hash);
        const bookmark = `${window.location.protocol}//${window.location.host}${window.location.pathname}#${urlParam.nab}/${urlParam.oTab}/Contract/${urlParam.oId}/${urlParam.implId}/${fIndex}`;
        window.history.pushState({ path: bookmark }, '', bookmark);
      }
    }

    const hasImplContractABI: boolean = (implContract && implContract.abi) ? true : false
    var funcAbiMinimal: string[] = [];
    var funcComboboxesSelected: string = "";
    var callParams: CallParam[] = [];
    if (implContract && hasImplContractABI) {
        const abi: Abi = new Abi(implContract.abi as string);
        const funcAbis: Function = abi.getFunctions();
        funcAbiMinimal = funcAbis.minimal;
        const funcAbiJson = funcAbis.json;

        funcComboboxesSelected = selectedFuncIndex != null ? funcAbiMinimal[selectedFuncIndex] : funcAbiMinimal[0];
        callParams = selectedFuncIndex != null ? funcAbiJson[selectedFuncIndex].inputs : [];
    }

    const contractInputs: ComboboxesInputs = {
      items: proxyComboboxesItems,
      defaultItem: contractAddress == null ? "" : contractAddress,
      onChange: comboboxesOnChangeHandler.proxy,
    }

    const implContractInputs: ComboboxesInputs = {
      items: implComboboxesItems,
      defaultItem: implAddress == null ? "" : implAddress,
      onChange: comboboxesOnChangeHandler.implementation
    }

    const funcsInputs: ComboboxesInputs = {
      items: funcAbiMinimal,
      defaultItem: funcComboboxesSelected,
      onChange: comboboxesOnChangeHandler.function
    }

    const contractOuputs: ContractOuputs = {
      contractInputs: contractInputs,
      implContractInputs: implContractInputs,
      funcsInputs: funcsInputs,
      hasImplContractABI: hasImplContractABI,
      selectedFuncIndexInputs: selectedFuncIndex,
      callParams: callParams
    }

    useEffect(()=>{
      
      if (exportState) exportState(state);
      state.contractComboboxes!.selected[1](contractAddress == null ? "" : contractAddress);
      state.implContractComboboxes!.selected[1](implAddress == null ? "" : implAddress);
      if (state.funcsComboboxes) state.funcsComboboxes.selected[1](funcComboboxesSelected);

    }, [state, funcComboboxesSelected, exportState, contractAddress, implAddress]);

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
                <Comboboxes key="contractComboboxes" items={contractOuputs.contractInputs.items} defaultItem={contractOuputs.contractInputs.defaultItem} onChange={contractOuputs.contractInputs.onChange} exportState={exportStateHandler.contractComboboxes} />
              </dd>
            </div>
          </dl>
          <dl className="grid grid-cols-1 sm:grid-cols-3">
            <div className="border-t border-gray-100 px-4 py-6 sm:col-span-2 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">implementation</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">             
                <Comboboxes key="implContractComboboxes" items={contractOuputs.implContractInputs.items} defaultItem={contractOuputs.implContractInputs.defaultItem} onChange={contractOuputs.implContractInputs.onChange} exportState={exportStateHandler.implContractComboboxes}/>
              </dd>
            </div>
          </dl>
          {hasImplContractABI ? 
            (<>
              <dl className="grid grid-cols-1 sm:grid-cols-3">
                <div className="border-t border-gray-100 px-4 py-6 sm:col-span-3 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">function</dt>
                  <Comboboxes key="funcsComboboxes" items={contractOuputs.funcsInputs.items} defaultItem={contractOuputs.funcsInputs.defaultItem} onChange={contractOuputs.funcsInputs.onChange} exportState={exportStateHandler.funcsComboboxes}/>
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
                {contractOuputs.callParams.map((item) => {
                    return (
                      <div key={item.name} className="border-t border-gray-100 px-4 py-6 sm:col-span-2 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">{item.name} ({item.type})</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
                        <input
                            placeholder=""
                            type={item.type?.includes("int") ? "number" : "text"}
                            name={item.name}
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



      
