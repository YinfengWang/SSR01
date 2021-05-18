
import React from 'react';
import { Redirect} from 'react-router-dom';
import TopicList from '../pages/topic.list/index';
import UserLogin from '../pages/user/login';
import UserInfo from '../pages/user/info';
import CreateTopic from '../pages/topic.create';

import ToppicDetail from '../pages/topic.detail/index';
import Test from '../pages/test/Test';


export const routes = () => [{
    path: '/',
    exact: true,
    key: 'topic',
    render: () => <Redirect to='/list' />,
},
{
    path: '/user/login',
    component: UserLogin,
    exact: true,
    key: 'UserLogin',
},
{
    path: '/user/info',
    component: UserInfo,
    exact: true,
    key: 'UserInfo',
},
{
    path: '/list',
    component: TopicList,
    exact: true,
    loadData: TopicList.loadData,
    key: 'topicList',
},
{
    path: '/detail/:id',
    component: ToppicDetail,
    exact: true,
    key: 'topicDetail',
},
{
    path: '/createTopic',
    component: CreateTopic,
    exact: true,
    key: 'CreateTopic',
},
{
    path: '/test',
    component: Test,
    exact: true,
    key: 'test',
},
];
