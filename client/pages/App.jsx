import React from 'react';
import {Link} from 'react-router-dom';


const App = () => (
    <div>
        <Link to='/'>首页</Link>
        <br />
        <Link to='/detail'>详情页</Link>
        <br />
    </div>
);
export default App;
