import { hot } from 'react-hot-loader/root';
import React from 'react';
import ReactDom from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import App from './pages/App';
import Routes from './config/routes';
const isDev = process.env.NODE_ENV === 'development';

if (isDev) {hot(App);}

const root = document.getElementById('root');
const render = (Component) => {
    ReactDom.hydrate(
        <div>
            <BrowserRouter>
                <Component />
                <Routes/>
            </BrowserRouter>
        </div>,
        root);
};
render(App);
