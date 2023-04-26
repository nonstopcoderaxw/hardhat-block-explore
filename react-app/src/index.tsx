import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from "./appContext/store"
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import AppTest from './AppTest';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const client = new ApolloClient({
    uri: 'http://localhost:4001',
    cache: new InMemoryCache(),
});

if (window.location.pathname) {
  root.render(
    <Provider store={store}>
      <ApolloProvider client={client}>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </ApolloProvider>
    </Provider>
  );
}

if (window.location.pathname == "/AppTest") {
  root.render(
    <React.StrictMode>
      <AppTest />
    </React.StrictMode>
  );
}



