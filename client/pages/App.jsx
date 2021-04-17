import React from 'react';
import {Link} from 'react-router-dom';
import Routes from '../config/routes';


const App = () => (
    <div>
        <Link to='/'>首页</Link>
        <br />
        <Link to='/detail'>详情页</Link>
        <br />
        <Routes/>
    </div>
);
export default App;
