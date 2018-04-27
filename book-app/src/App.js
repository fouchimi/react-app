import React, { Component } from 'react';
import { Header } from './Header';
import { Main } from './Main';
import './App.css';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store';

export const baseURL = 'https://www.googleapis.com/books/v1';
export const apiKey = 'AIzaSyDRWwNOZfk4Vpmd2-sQxFs1YK269ZjAJOQ';
export const localhostURL = 'http://localhost:3004';

export class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <div className="App">
            <Header />
            <Main />
          </div>
        </PersistGate>
      </Provider>
    );
  }
}
