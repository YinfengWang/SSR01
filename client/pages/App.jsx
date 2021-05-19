import React from 'react';
import routes from '../config/routes';
import AppBar from '../pages/layout/AppBar';


const App = () => (
    <div>
        <AppBar />
        {routes()}
    </div>
);
export default App;
