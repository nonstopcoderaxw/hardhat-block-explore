import { Routes, Route } from 'react-router-dom';
import Nav from "./components/tailwindui/Nav"
import Comboboxes, { ComboboxesState } from "./components/tailwindui/Comboboxes"
import Overview, { OverviewInputs } from "./features/overview/Overview"
import { useQuery } from "@apollo/client"
import { Account as Account_, Block as Block_, Transaction as Transaction_ } from "./graphql/generated";
import { Combo1_Query } from "./graphql/queries"
import { useAppDispatch } from './appContext/hooks';
import { useLocation } from 'react-router-dom';
import { getURLParam, URLParam } from "./utils/utils";
import { initAppState, updateSelectedAccount, GlobalAppState } from "./appContext/appContextSlice"
import { useEffect, useMemo, useState } from "react";

type NavItem = {
  name: string | null, 
  href: string | null, 
  current: boolean | null
}

type NavInputs = {
  RightItem: () => void,
  LogoImg: () => void,
  navItems: NavItem[]
}

export type AppOutputs = {
  nav: NavInputs,
  overview: OverviewInputs
}

type AppState = {
  comboboxes: ComboboxesState | null
}

const logoImg = <a href="/"><img className="h-8 w-auto" src="./assets/logo.png" alt="Log" /></a>;

export default function App() {

  const urlParam: URLParam = getURLParam(useLocation().hash);
  const dispatch = useAppDispatch();

  const { data: gqlData, loading, error } = useQuery(Combo1_Query); 

  if (!loading && error) throw(error)

  var accounts: Account_[] = [];
  var itemsComboboxes: string[] = [];
  var navComboBoxesOnChangeHandlers = (selected) => {
    dispatch(updateSelectedAccount({selectedAccount: selected}))
  }

  const state: AppState = useMemo(()=>{
    return { comboboxes: null }
  }, [])

  const comboboxesExportStateHandler = (comboboxesState: ComboboxesState) => {
    state.comboboxes = {
      ...comboboxesState
    }
  }
  const comboboxes = <Comboboxes items={itemsComboboxes} onChange={navComboBoxesOnChangeHandlers} defaultItem={accounts.length > 0 ? accounts[0].address : ""} exportState={comboboxesExportStateHandler}  />;
  const nav: NavInputs = {
      RightItem: (() => comboboxes),
      LogoImg: (() => logoImg),
      navItems: [
        //{ name: 'Overview', href: '/', current: true },
        //{ name: 'Interactions', href: '#', current: false },
        //{ name: 'ABIs', href: '/abis', current: false },
        //{ name: 'Utilities', href: '#', current: false }
      ]
  }
  
  var _appState: GlobalAppState | null = null;
  const uiapp: AppOutputs = {
    nav: {
      RightItem: () => {},
      LogoImg: () => {},
      navItems: []
    },
    overview: {
      oTab: null,
      oType: null,
      oId: null,
      implId: null,
      fIndex: null
    }
  }

  var body = <></>;
  if (gqlData) {
      accounts = gqlData.accounts as Account_[];

      for (let i  = 0; i < accounts.length; i++) {
          itemsComboboxes.push(accounts[i].address);
      }

      _appState = {
        selectedAccount: accounts.length > 0 ? accounts[0].address : null,
        accounts: gqlData.accounts as Account_[],
        contracts: gqlData.contracts as Account_[],
        blocks: gqlData.blocks as Block_[],
        transactions: gqlData.transactions as Transaction_[],
      }
      
      dispatch(initAppState(_appState))

      uiapp.nav = nav;
      uiapp.overview = {
        oTab: urlParam.oTab,
        oType: urlParam.oType,
        oId: urlParam.oId,
        implId: urlParam.implId,
        fIndex: urlParam.fIndex
      }

      body = 
        <>
          <div className="flex min-h-full flex-col">
            <Nav navs={uiapp.nav.navItems} RightItem={uiapp.nav.RightItem} LogoImg={uiapp.nav.LogoImg} />
              <Routes>
                <Route path='/' element={<Overview oTab={uiapp.overview.oTab} oType={uiapp.overview.oType} oId={uiapp.overview.oId} implId={uiapp.overview.implId} fIndex={uiapp.overview.fIndex} />} />
              </Routes>
          </div>
        </>
  }


  useEffect(() => {
    if(_appState) state.comboboxes!.setSelected(_appState.selectedAccount == null ? "" : _appState.selectedAccount);
  }, [_appState, state])

  return (
    body
  )
}



