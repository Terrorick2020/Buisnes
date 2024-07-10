import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import reportWebVitals from '../src/reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import { YMaps } from 'react-yandex-maps';
import {CustomProvider} from 'rsuite';
import 'rsuite/Dropdown/styles/index.css';

import store from '../src/store'

const YandexQuery = {
  apikey: "b1a6a3a4-eaea-49cc-89b9-37462eba3d12",
  lang: "ru_RU"
}

const root = ReactDOM.createRoot(
  document.getElementById('root')
);

root.render(
  <React.StrictMode>
    <YMaps query={YandexQuery}>
      <Provider store={store}>
        <BrowserRouter>
            <CustomProvider theme="dark">
              <App />
            </CustomProvider>
        </BrowserRouter>
      </Provider>
    </YMaps>
  </React.StrictMode>
);

reportWebVitals();