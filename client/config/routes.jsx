import React from 'react';
import {Route, Redirect} from 'react-router-dom';

import TopicList from '../pages/topic.list/index';
import ToppicDetail from '../pages/topic.detail/index';

export default () => [
    <Route key='topic' path='/' render={() => <Redirect to='/list' />} exact/>,
    <Route key='topicList' path='/list' component={TopicList} />,
    <Route key='topicDetail' path='/detail' component={ToppicDetail} />,
];
