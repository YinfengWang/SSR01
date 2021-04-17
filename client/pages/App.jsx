import React from 'react';
import {Link} from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import {routes} from '../config/routes';

const App = () => (
    <div>
        <Link to='/'>首页</Link>
        <br />
        <Link to='/detail'>详情页</Link>
        <br />
        {renderRoutes(routes())}
    </div>
);
export default App;
