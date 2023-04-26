import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import Nav from "./components/tailwindui/Nav"
import Comboboxes from "./components/tailwindui/Comboboxes"
import Overview from "./features/overview/Overview"
import { ApolloProvider, ApolloClient, InMemoryCache, useQuery, gql } from '@apollo/client';
import { ALL_ACCOUNTS_QUERY } from "./api/graghql"
import { useAppSelector, useAppDispatch } from './appContext/hooks';
import { updateAccounts } from "./appContext/appContextSlice"

export default function App() {
  const dispatch = useAppDispatch();

  const { data, loading, error } = useQuery(ALL_ACCOUNTS_QUERY); 

  if (loading) return (
    <>
    </>
  );

  const accounts = data.accounts;

  dispatch(updateAccounts(accounts))

  dispatch(
    (dispatch, getState) => console.log("getState", getState())
  )

  const comboboxes = <Comboboxes accounts={accounts} />;
  const logoImg = <img className="h-8 w-auto" src="./assets/logo.png" alt="Log" />;

  const nav = {
      RightItem: (() => comboboxes),
      LogoImg: (() => logoImg),
      navItems: [
        { name: 'Overview', href: '/overview', current: true },
        { name: 'Contracts', href: '#', current: false },
        { name: 'ABIs', href: '#', current: false },
        { name: 'Utilities', href: '#', current: false }
      ]
  }

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

// [
  //     { address: '0x283af0b28c62c092c9727f1ee09c02ca627eb7f5', balance: '1000000', numOfTxs: "10" },
  //     { address: '0x283af0b28c62c092c9727f1ee09c02ca627eb7f1', balance: '1000000', numOfTxs: "10" },
  //     { address: '0x283af0b28c62c092c9727f1ee09c02ca627eb7f2', balance: '1000000', numOfTxs: "10" },
  //     { address: '0x283af0b28c62c092c9727f1ee09c02ca627eb7f3', balance: '1000000', numOfTxs: "10" },
  //     { address: '0x283af0b28c62c092c9727f1ee09c02ca627eb7f4', balance: '1000000', numOfTxs: "10" },
  //     { address: '0x283af0b28c62c092c9727f1ee09c02ca627eb7f5', balance: '1000000', numOfTxs: "10" },
  //     { address: '0x283af0b28c62c092c9727f1ee09c02ca627eb7f6', balance: '1000000', numOfTxs: "10" },
  //     { address: '0x283af0b28c62c092c9727f1ee09c02ca627eb7f7', balance: '1000000', numOfTxs: "10" },
  //     { address: '0x283af0b28c62c092c9727f1ee09c02ca627eb7f8', balance: '1000000', numOfTxs: "10" },
  //     { address: '0x283af0b28c62c092c9727f1ee09c02ca627eb7f9', balance: '1000000', numOfTxs: "10" },
  // ]