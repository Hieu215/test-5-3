import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import './style/main.css'
import '@shopify/polaris/build/esm/styles.css';
import { AppProvider } from '@shopify/polaris';
// @ts-ignore
import { createRoot } from 'react-dom/client';
import store from "./store/configReducer";
import { Provider } from 'react-redux';
const rootElement = document.getElementById('root') as Element;
createRoot(rootElement).render( <React.StrictMode>
    <BrowserRouter>
        <Provider store={store}>
            <AppProvider i18n={{}} >
                <App />
            </AppProvider>
        </Provider>

    </BrowserRouter>
</React.StrictMode>,);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
