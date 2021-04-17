import React from 'react';
import { StaticRouter } from 'react-router';
import { Provider, useStaticRendering } from 'mobx-react';
import App from './pages/App';
import { createStoreMap } from './store/index';
import {routes} from '../client/config/routes';
// eslint-disable-next-line react-hooks/rules-of-hooks
useStaticRendering(true);

export default (stores, routerContext, url) => {
    console.log(stores);
    return (
        <Provider {...stores}>
            <StaticRouter location={url} context={routerContext} >
                <App />
            </StaticRouter>
        </Provider>

    );
};
export { createStoreMap };
export { routes };
