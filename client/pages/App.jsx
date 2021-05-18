import React from 'react';
import { renderRoutes } from 'react-router-config';
import {routes} from '../config/routes';
import AppBar from '../pages/layout/AppBar';


const App = () => (
    <div>
        <AppBar />
        {renderRoutes(routes())}
    </div>
);
export default App;
