import React from 'react';
import {Route, Redirect} from 'react-router-dom';

import TopicList from '../pages/topic.list/index';
import ToppicDetail from '../pages/topic.detail/index';
import Test from '../pages/test/Test';

export default () => [
    <Route key='topic' path='/' render={() => <Redirect to='/list' />} exact/>,
    <Route key='topicList' path='/list' component={TopicList} />,
    <Route key='topicDetail' path='/detail' component={ToppicDetail} />,
    <Route key='test' path='/test' component={Test} />,
];
