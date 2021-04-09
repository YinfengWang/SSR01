import React from 'react';
import {StaticRouter} from 'react-router';
import {Provider, enableStaticRendering} from 'mobx-react';
import Routes from './config/routes';
import App from './pages/App';
import {createStoreMap} from '../client/store/store';

enableStaticRendering(true);


export default (stores, routerContext, url) => {
    let store = {...stores};
    console.log('stores=', store);
    console.log('routerContext=', routerContext);
    console.log('url=', url);
    return (
        <StaticRouter location={url} context={routerContext} >
            <Provider {...stores}>
                <App />
                <Routes />
            </Provider>
        </StaticRouter>
    );
};


// export default (stores, routerContext, url) => (
//   <StaticRouter context={routerContext}>
//       <Provider {...stores}>
//           <App />
//       </Provider>
//   </StaticRouter>
// );

export {createStoreMap};

