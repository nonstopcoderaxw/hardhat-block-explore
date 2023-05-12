import { ethers } from "ethers"
import { ContractDocument, Account as Account_, Block as Block_, Hh_ReadDocument, Hh_SendDocument } from "../graphql/generated";
import { useQuery, useMutation } from "@apollo/client"
import { getURLParam, URLParam, State } from "../utils/utils"
import Comboboxes, { ComboboxesInputs, ComboboxesState} from "./tailwindui/Comboboxes"
import Alert from "./tailwindui/Alert"
import { createRef, useState, useEffect, useMemo } from 'react'
import { useAppSelector } from '../appContext/hooks'
import { selectAppState } from "../appContext/appContextSlice"
import { Abi, Function } from "../utils/abi"
import { Address } from "../utils/Address"
import { apolloClient } from "../ApolloClient"


export type ContractInputs = {
  defaultContractAddress: string | null,
  defaultImplAddress: string | null,
  defaultSelectedFuncIndex: number | null,
  exportState?: (state: ContractState) => void,
}

type CallParam = {
  name: string | undefined,
  type: string | undefined
}

export type ContractOuputs = {
  contractInputs: ComboboxesInputs,
  implContractInputs: ComboboxesInputs,
  hasImplContractABI: boolean,
  funcsInputs: ComboboxesInputs,
  selectedFuncIndexInputs: Number | null,
  callParams: CallParam[],
  fromBN: number | null, 
  toBN: number | null,
  readbtnOnClickHanlder: ((e) => void) | undefined,
  writebtnOnClickHandler:  ((e) => void) | undefined,
  payableFunc?: boolean,
  ethValue?: string,
  ethValueOnChangeHandler: ((e) => void) | undefined,
  params?: any,
  paramOnChangeHandler: ((e) => void) | undefined,
  error: string | null,
  viewResults?: any,
  txHash: string | null,
  txHashOnClickHandler: ((e) => void) | undefined
}

export type ContractState = {
  contractComboboxes: ComboboxesState | null,
  implContractComboboxes: ComboboxesState | null,
  funcsComboboxes: ComboboxesState | null
  reset: (contractAddress) => void | null
}

export default function Contract({defaultContractAddress, defaultImplAddress, defaultSelectedFuncIndex, exportState}: ContractInputs) {

    defaultContractAddress = (defaultContractAddress && defaultContractAddress != null) ? (new Address(defaultContractAddress)).value : null;
    defaultImplAddress = (defaultImplAddress && defaultImplAddress != null) ? (new Address(defaultImplAddress)).value : null;
    if (defaultSelectedFuncIndex && (typeof defaultSelectedFuncIndex) !== "number") throw (new Error("defaultSelectedFuncIndex input type error"));

    let _appState = useAppSelector(selectAppState);
    if (!_appState) throw (new Error("NULL_APP_STATE"));
    
    const [ contractAddress, setContractAddress ] = useState<string | null>(defaultContractAddress);
    const [ implAddress, setImplAddress ] = useState<string | null>(defaultImplAddress);
    const [ selectedFuncIndex, setSelectedFuncIndex ] = useState<number | null>(Number(defaultSelectedFuncIndex));
    const [ fromBN, setFromBN ] = useState<number | null>(null);
    const [ toBN, setToBN ] = useState<number | null>(null);
    const [ ethValue, setEthValue ] = useState<string | undefined>(undefined);
    const [ params, setParams ] = useState<any>({});
    const [ viewResults, setViewResults ] = useState<any>({});
    const [ error, setError ] = useState<string | null>(null);
    const [ txHash, setTxHash ] = useState<string | null>(null);

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

    const { data: gqlData, loading: gqlLoading, error: gqlError } = useQuery(ContractDocument, {
      variables: { address: implAddress as string },
      skip: !implAddress || implAddress == null 
    }); 
    
    if (!gqlLoading && gqlError) throw(gqlError)

    const state: ContractState = useMemo(() => {
      return {
        contractComboboxes: null,
        implContractComboboxes: null,
        funcsComboboxes: null,
        reset: (contractAddress) => {
          setContractAddress(contractAddress);
          setImplAddress(contractAddress);
          setSelectedFuncIndex(0);
          setEthValue(undefined); 
          setParams({}); 
          setViewResults({}); 
          setError(null); 
          setTxHash(null);
        }
      }
    }, [contractAddress, setContractAddress, implAddress, setImplAddress, selectedFuncIndex, setSelectedFuncIndex])

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
        const bookmark = `${window.location.protocol}//${window.location.host}${window.location.pathname}#${urlParam.nab}/${urlParam.oTab}/contract/${address}/${urlParam.implId}/${urlParam.fIndex}/${urlParam.frBN}/${urlParam.toBN}`;
        window.history.pushState({ path: bookmark }, '', bookmark);
      },
      implementation: (address) => {
        setImplAddress(address);
        setSelectedFuncIndex(0);
        setEthValue(undefined); 
        setParams({}); 
        setViewResults({}); 
        setError(null); 
        setTxHash(null);
        const urlParam: URLParam = getURLParam(window.location.hash);
        const bookmark = `${window.location.protocol}//${window.location.host}${window.location.pathname}#${urlParam.nab}/${urlParam.oTab}/contract/${urlParam.oId}/${address}`;
        window.history.pushState({ path: bookmark }, '', bookmark);
      },
      function: (item) => {
        const fIndex = funcAbiMinimal.findIndex(element => element === item);
        setSelectedFuncIndex(fIndex);
        const urlParam: URLParam = getURLParam(window.location.hash);
        const bookmark = `${window.location.protocol}//${window.location.host}${window.location.pathname}#${urlParam.nab}/${urlParam.oTab}/contract/${urlParam.oId}/${urlParam.implId}/${fIndex}`;
        window.history.pushState({ path: bookmark }, '', bookmark);
      }
    }

    const hasImplContractABI: boolean = (implContract && implContract.abi) ? true : false
    var funcAbiMinimal: string[] = [];
    var funcComboboxesSelected: string = "";
    var callParams: CallParam[] = [];
    var payableFunc: boolean | undefined;
    if (implContract && hasImplContractABI) {
        const abi: Abi = new Abi(implContract.abi as string);
        const funcAbis: Function = abi.getFunctions();
        funcAbiMinimal = funcAbis.minimal;
        const funcAbiJson = funcAbis.json;

        funcComboboxesSelected = selectedFuncIndex != null ? funcAbiMinimal[selectedFuncIndex] : funcAbiMinimal[0];
        callParams = selectedFuncIndex != null ? funcAbiJson[selectedFuncIndex].inputs : [];
        payableFunc = selectedFuncIndex != null ? funcAbiJson[selectedFuncIndex].payable : undefined;
    }

    if (payableFunc && !ethValue) setEthValue("0");

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

    const readbtnOnClickHanlder = async (e) => {
      setError(null);
      setViewResults({});
      setTxHash(null);

      const _selectedfuncindexinputs: number = e.target.getAttribute("data-selectedfuncindexinputs");
      const _selectedabijson = (new Abi(
        JSON.stringify(
          [ funcsInputs.items[_selectedfuncindexinputs] ]
        )
      )).toJson()

      try {
        const iface = new ethers.utils.Interface(_selectedabijson);
        const funcName = _selectedabijson[0].name;
        const blockTag0: number = fromBN === null ? 0 : fromBN;
        const blockTag1: number = toBN === null ? 0 : toBN;

        if (blockTag0 > blockTag1) throw (new Error("Wrong Block Number"));
        const _viewResults = {};
        for (let i = blockTag0; i <= blockTag1; i++) {
          const resp = await apolloClient.mutate({
            mutation: Hh_ReadDocument,
            variables: {
              contractAddress: contractAddress!,
              funcName: funcName,
              abi: JSON.stringify(_selectedabijson),
              params: params[_selectedfuncindexinputs] ? JSON.stringify(params[_selectedfuncindexinputs]) : "",
              blockTag: i,
              address: _appState.selectedAccount
            }
          });
          _viewResults[i] = resp.data!.hh_read;
        } 
        setViewResults({..._viewResults});
      } catch (e: any) {
        setError(e.toString().includes("BAD_DATA") ? "Error: please all inputs are in correct formats(inc. block numbers)" : e.toString());
      }
    };

    const writebtnOnClickHandler = async (e) => {
      setError(null);
      setViewResults({});
      setTxHash(null);

      const _selectedfuncindexinputs: number = e.target.getAttribute("data-selectedfuncindexinputs");

      const _selectedabijson = (new Abi(
        JSON.stringify(
          [ funcsInputs.items[_selectedfuncindexinputs] ]
        )
      )).toJson()

      try {
        const iface = new ethers.utils.Interface(_selectedabijson);
        const funcName = _selectedabijson[0].name 
        const calldata = iface.encodeFunctionData(funcName, params[_selectedfuncindexinputs]);
        const resp = await apolloClient.mutate({
          mutation: Hh_SendDocument, 
          variables: { 
            data: calldata,
            value: ethValue ? ethValue : "0x0",
            to: contractAddress!,
            from: _appState.selectedAccount
          }
        });

        setTxHash(resp.data!.hh_send!)
      } catch (e: any) {
        setError(e.toString());
      }
    };

    const paramOnChangeHandler = (e) => {
        const i = e.target.getAttribute("data-index");
        params[contractOuputs.selectedFuncIndexInputs!.toString()][i] = e.target.value;
        setParams({...params}); // setParams(params) will NOT rerender!
    }

    const contractOuputs: ContractOuputs = {
      contractInputs: contractInputs,
      implContractInputs: implContractInputs,
      funcsInputs: funcsInputs,
      hasImplContractABI: hasImplContractABI,
      selectedFuncIndexInputs: selectedFuncIndex,
      callParams: callParams,
      fromBN: fromBN,
      toBN: toBN,
      readbtnOnClickHanlder: readbtnOnClickHanlder,
      writebtnOnClickHandler: writebtnOnClickHandler,
      payableFunc: payableFunc,
      params: params,
      ethValue: ethValue,
      ethValueOnChangeHandler: (e) => {
        const value =  e.target.value;
        setEthValue(value);
      },
      paramOnChangeHandler: paramOnChangeHandler,
      error: error,
      txHash: txHash,
      viewResults: viewResults,
      txHashOnClickHandler: (e) => {
        const hash = e.target.getAttribute("data-hash");
        const urlParam: URLParam = getURLParam(window.location.hash);
        const urlTo = `${window.location.protocol}//${window.location.host}${window.location.pathname}#0/2/transaction/${hash}`;
        window.open(urlTo, '_blank');
      }
    }

    useEffect(()=>{
      if (exportState) exportState(state);
      state.contractComboboxes!.setSelected(contractAddress == null ? "" : contractAddress);
      state.implContractComboboxes!.setSelected(implAddress == null ? "" : implAddress);
      if (state.funcsComboboxes) state.funcsComboboxes.setSelected(funcComboboxesSelected);
      
      const blocks: Block_[] = _appState.blocks as Block_[];
      const lastBN: number = blocks.length > 0 ? Number(blocks[0].number) : 0; /// load again
      if (fromBN === null) setFromBN(lastBN);
      if (lastBN !== toBN) setToBN(lastBN);

    }, [state, funcComboboxesSelected, exportState, contractAddress, implAddress]);
    
    return (
      <>
        <div id="contract-section">
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
          {contractOuputs.hasImplContractABI ? 
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
                      key="from-blocknumber"
                      className="block w-2/5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      value={contractOuputs.fromBN === null ? "" : contractOuputs.fromBN}
                      onChange={(e)=>{ setFromBN(e.target.value === "" ? null : Number(e.target.value)) }}
                    /></dd>
                </div>
                <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">to</dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2"><input
                      placeholder="block number"
                      type="number"
                      name="to-blocknumber"
                      key="to-blocknumber"
                      className="block w-2/5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      value={contractOuputs.toBN === null ? "" : contractOuputs.toBN}
                      onChange={(e)=>{ setToBN(e.target.value === "" ? null : Number(e.target.value)) }}
                    /></dd>
                </div>
                {contractOuputs.payableFunc ? (
                  <div className="border-t border-gray-100 px-4 py-6 sm:col-span-2 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">value(payable): </dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
                    <input
                        placeholder="wei value"
                        type="number"
                        name="value"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        value={contractOuputs.ethValue}
                        onChange={contractOuputs.ethValueOnChangeHandler}
                      /></dd>
                  </div>
                ) : (
                  <></>
                )}

                {contractOuputs.callParams.map((item, i) => {
                    var value: string = ""
                    if(!params[contractOuputs.selectedFuncIndexInputs!.toString()]){
                      params[contractOuputs.selectedFuncIndexInputs!.toString()] = [];
                    }
                    if (params[contractOuputs.selectedFuncIndexInputs!.toString()][i]) {
                        value = params[contractOuputs.selectedFuncIndexInputs!.toString()][i];
                    }
                    return (
                      <div key={contractOuputs.selectedFuncIndexInputs!.toString() + i.toString()} className="border-t border-gray-100 px-4 py-6 sm:col-span-2 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">{item.name} ({item.type})</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
                        <input
                            data-index={i}
                            placeholder=""
                            type="text"
                            name={item.name}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            value={value}
                            onChange={contractOuputs.paramOnChangeHandler}
                          /></dd>
                      </div>
                    )
                })}
              </dl>
              <dl className="grid grid-cols-1 sm:grid-cols-1">
                {contractOuputs.error ? (
                    <Alert message={contractOuputs.error} type="error" />
                  ) : (<></>)}
                {Object.keys(contractOuputs.viewResults).map((key, i) => {
                    return (
                      <div key={"bn"+key.toString()} className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Block {key}:</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
                            {JSON.stringify(contractOuputs.viewResults[key], null, 4)}
                        </dd>
                      </div>
                    )
                })}

                {contractOuputs.txHash ? (
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
                    <small>hash:</small>
                    <a href="/#" 
                       className="hover:bg-gray-50" 
                       onClick={contractOuputs.txHashOnClickHandler} 
                       data-hash={contractOuputs.txHash ? contractOuputs.txHash : ""} >
                        {contractOuputs.txHash ? contractOuputs.txHash : ""}
                    </a>
                  </dd>
                ) : (
                  <></>
                )}

              </dl>
              <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                  <button
                    type="button"
                    data-selectedfuncindexinputs={contractOuputs.selectedFuncIndexInputs!}
                    className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-1"
                    onClick={contractOuputs.readbtnOnClickHanlder} 
                  >
                    Read
                  </button>
                  <button
                    type="button"
                    data-selectedfuncindexinputs={contractOuputs.selectedFuncIndexInputs!}
                    className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
                    onClick={contractOuputs.writebtnOnClickHandler} 
                  >
                    Write
                  </button>
                </div>
            </>) : (<></>)
          }
          {(!contractOuputs.hasImplContractABI && !gqlLoading) ? <Alert message="ABI Not Found!" type="warn" /> : (<></>)}
        </div>
      </>
  )
}



      
