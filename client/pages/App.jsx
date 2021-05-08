import React from 'react';
import {Link} from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import {routes} from '../config/routes';
import Helmet from 'react-helmet';

const App = () => (
    <div>
        <Helmet>
            <title>This is topic list !</title>
            <meta name="description" content="This is description" />
        </Helmet>
        <Link to='/'>首页</Link>
        <br />
        <Link to='/detail'>详情页</Link>
        <br />
        {renderRoutes(routes())}
    </div>
);
export default App;
