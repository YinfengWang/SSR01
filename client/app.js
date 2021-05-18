import { hot } from 'react-hot-loader/root';
import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'mobx-react';
import App from './pages/App';
import { createClientStoreMap } from '../client/store/';

import {MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { pink, lightBlue } from '@material-ui/core/colors';

const isDev = process.env.NODE_ENV === 'development';

const theme = createMuiTheme({
    palette: {
        primary: lightBlue,
        secondary: pink,
    },
});

if (isDev) {hot(App);}

const root = document.getElementById('root');
const render = (Component) => {
    const initalState = window._INITIAL_STATE_ || {};
    const stores = createClientStoreMap(initalState);
    ReactDom.hydrate(
        <BrowserRouter >
            <Provider {...stores}>
                <MuiThemeProvider theme={theme}>
                    <Component />
                </MuiThemeProvider>
            </Provider>
        </BrowserRouter>
        ,
        root);
};
render(App);
