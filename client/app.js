import { hot } from 'react-hot-loader/root';
import React from 'react';
import ReactDom from 'react-dom';
import App from './App.jsx';

hot(App);
const root = document.getElementById('root');
const render = (Component) => {
    ReactDom.hydrate(<Component />, root);
};
render(App);
