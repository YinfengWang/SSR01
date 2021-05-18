import React from 'react';
import { StaticRouter } from 'react-router';
import { Provider, useStaticRendering } from 'mobx-react';
import App from './pages/App';
import { createStoreMap } from './store/index';
import {routes} from '../client/config/routes';
import {JssProvider} from 'react-jss';
import { MuiThemeProvider } from '@material-ui/core/styles';
// eslint-disable-next-line react-hooks/rules-of-hooks
useStaticRendering(true);

export default (stores, routerContext, sheetRegistry, jss, theme, url) => {
    console.log(stores);
    return (
        <Provider {...stores}>
            <StaticRouter location={url} context={routerContext} >
                <JssProvider registry={sheetRegistry} jss={jss}>
                    <MuiThemeProvider theme={theme}>
                        <App />
                    </MuiThemeProvider>
                </JssProvider>
            </StaticRouter>
        </Provider>

    );
};
export { createStoreMap };
export { routes };
