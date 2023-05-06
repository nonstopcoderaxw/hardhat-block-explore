import { Routes, Route } from 'react-router-dom';
import Nav from "./components/tailwindui/Nav"
import Comboboxes from "./components/tailwindui/Comboboxes"
import Overview, { UIOverviewInput } from "./features/overview/Overview"
import { useQuery } from "@apollo/client"
import { Account as Account_, Block as Block_, Transaction as Transaction_ } from "./graphql/generated";
import { Combo1_Query } from "./graphql/queries"
import { useAppDispatch } from './appContext/hooks';
import { useLocation } from 'react-router-dom';
import { getURLParam, URLParam } from "./utils/utils";
import { initAppState, updateSelectedAccount, AppState } from "./appContext/appContextSlice"

type UINavItem = {
  name: string | null, 
  href: string | null, 
  current: boolean | null
}

type UINav = {
  RightItem: () => void,
  LogoImg: () => void,
  navItems: UINavItem[]
}

export type UIAppOutput = {
  nav: UINav,
  overview: UIOverviewInput
}

const logoImg = <a href="/"><img className="h-8 w-auto" src="./assets/logo.png" alt="Log" /></a>;

export default function App() {

  const urlParam: URLParam = getURLParam(useLocation().hash);
  const dispatch = useAppDispatch();
  const { data: gqlData, loading, error } = useQuery(Combo1_Query); 

  if (loading) return null;

  if (error) throw(error)

  var accounts: Account_[] = [];
  var itemsComboboxes: string[] = [];
  var navComboBoxesHandlers = (selected) => {
    dispatch(updateSelectedAccount({selectedAccount: selected}))
  }

  const comboboxes = <Comboboxes items={itemsComboboxes} defaultItem={itemsComboboxes.length > 0 ? itemsComboboxes[0] : ""} onChange={navComboBoxesHandlers} />;
  const nav: UINav = {
      RightItem: (() => comboboxes),
      LogoImg: (() => logoImg),
      navItems: [
        { name: 'Overview', href: '/overview', current: true },
        { name: 'Interactions', href: '#', current: false },
        { name: 'ABIs', href: '#', current: false },
        { name: 'Utilities', href: '#', current: false }
      ]
  }
  
  if (gqlData) {
      accounts = gqlData.accounts as Account_[];

      for (let i  = 0; i < accounts.length; i++) {
          itemsComboboxes.push(accounts[i].address);
      }

      const _appState: AppState = {
        selectedAccount: accounts.length > 0 ? accounts[0].address : null,
        accounts: gqlData.accounts as Account_[],
        contracts: gqlData.contracts as Account_[],
        blocks: gqlData.blocks as Block_[],
        transactions: gqlData.transactions as Transaction_[],
        urlParam: urlParam
      }
      
      dispatch(initAppState(_appState))
  }

  const uiapp: UIAppOutput = {
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
      fIndex: null,
      frBN: null,
      toBN: null
    }
  }

  uiapp.nav = nav;
  uiapp.overview = {
    oTab: urlParam.oTab,
    oType: urlParam.oType,
    oId: urlParam.oId,
    implId: urlParam.implId,
    fIndex: urlParam.fIndex,
    frBN: urlParam.frBN,
    toBN: urlParam.toBN
  }

  return (
    <>
      <div className="flex min-h-full flex-col">
        <Nav navs={uiapp.nav.navItems} RightItem={uiapp.nav.RightItem} LogoImg={uiapp.nav.LogoImg} />
          <Routes>
            <Route path='/' element={<Overview oTab={uiapp.overview.oTab} oType={uiapp.overview.oType} oId={uiapp.overview.oId} implId={uiapp.overview.implId} fIndex={uiapp.overview.fIndex} frBN={uiapp.overview.frBN} toBN={uiapp.overview.toBN} />} />
          </Routes>
      </div>
    </>
  )
}



