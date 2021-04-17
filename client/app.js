import { hot } from 'react-hot-loader/root';
import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import {Provider} from 'mobx-react';
import App from './pages/App';
import {createStoreMap} from '../client/store/';
import Routes from './config/routes';


const isDev = process.env.NODE_ENV === 'development';

if (isDev) {hot(App);}

const root = document.getElementById('root');
const render = (Component) => {
    const stores = createStoreMap();
    ReactDom.hydrate(
        <div>
            <Provider {...stores}>
                <BrowserRouter >
                    <Component />
                    <Routes />
                </BrowserRouter>
            </Provider>
        </div>,
        root);
};
render(App);
