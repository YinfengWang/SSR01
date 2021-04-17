import React from 'react';
import { StaticRouter } from 'react-router';
import { Provider, useStaticRendering } from 'mobx-react';
import App from './pages/App';
import { createStoreMap } from './store/index';

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
// https://www.jianshu.com/p/55ba6d415bb1
// https://segmentfault.com/a/1190000022592588
// https://www.jianshu.com/p/55ba6d415bb1
// 服务端渲染 mobx-react 中的 Provider Error: Invalid hook call.
// mobx-state-tree
// export default (stores, routerContext, url) => (
//   <StaticRouter context={routerContext}>
//       <Provider {...stores}>
//           <App />
//       </Provider>
//   </StaticRouter>
// );
// https://mobx-react.js.org/recipes-context  參照
export { createStoreMap };

