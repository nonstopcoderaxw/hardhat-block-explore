import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from "./components/tailwindui/Nav"
import Comboboxes from "./components/tailwindui/Comboboxes"
import Overview from "./features/overview/Overview"
import { useQuery } from "@apollo/client"
import { Account as Account_, Block as Block_, Transaction as Transaction_ } from "./graphql/generated";
import { Combo1_Query } from "./graphql/queries"
import { useAppDispatch } from './appContext/hooks';
import { initAppState, updateSelectedAccount, AppState } from "./appContext/appContextSlice"


export default function App() {
  const dispatch = useAppDispatch();
  const { data, loading, error } = useQuery(Combo1_Query); 

  if (loading) return (
    <>
    </>
  );

  if (error) throw(error)

  const accounts: Account_[] = data!.accounts as Account_[];

  const itemsComboboxes: string[] = [];
  for (let i  = 0; i < accounts.length; i++) {
      itemsComboboxes.push(accounts[i].address);
  }

  const comboboxes = <Comboboxes items={itemsComboboxes} defaultItem={itemsComboboxes.length > 0 ? itemsComboboxes[0] : ""} onChange={(selected)=>{dispatch(updateSelectedAccount({selectedAccount: selected}))}} />;
  const logoImg = <a href="/"><img className="h-8 w-auto" src="./assets/logo.png" alt="Log" /></a>;
  const nav = {
      RightItem: (() => comboboxes),
      LogoImg: (() => logoImg),
      navItems: [
        { name: 'Overview', href: '/overview', current: true },
        { name: 'Interactions', href: '#', current: false },
        { name: 'ABIs', href: '#', current: false },
        { name: 'Utilities', href: '#', current: false }
      ]
  }

  const _appState: AppState = {
    selectedAccount: accounts.length > 0 ? accounts[0].address : null,
    accounts: data!.accounts as Account_[],
    contracts: data!.contracts as Account_[],
    blocks: data!.blocks as Block_[],
    transactions: data!.transactions as Transaction_[],
  }

  dispatch(initAppState(_appState))

  return (
    <>
      <div className="flex min-h-full flex-col">
        <Nav navs={nav.navItems} RightItem={nav.RightItem} LogoImg={nav.LogoImg} />
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Overview />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}



