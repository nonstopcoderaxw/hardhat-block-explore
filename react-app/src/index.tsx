import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from "./appContext/store"
import './index.css';
import App from './App';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';

const { REACT_APP_GRAGHQL } = process.env;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const client = new ApolloClient({
    uri: REACT_APP_GRAGHQL,
    cache: new InMemoryCache(),
});

root.render(
  <Provider store={store}>
    <ApolloProvider client={client}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </ApolloProvider>
  </Provider>
);





