
import React from 'react';
import { Redirect} from 'react-router-dom';
import TopicList from '../pages/topic.list/index';
import ToppicDetail from '../pages/topic.detail/index';
import Test from '../pages/test/Test';

export const routes = () => [{
    path: '/',
    exact: true,
    key: 'topic',
    render: () => <Redirect to='/list' />,
},
{
    path: '/list',
    component: TopicList,
    exact: true,
    loadData: TopicList.loadData,
    key: 'topicList',
},
{
    path: '/detail',
    component: ToppicDetail,
    exact: true,
    key: 'topicDetail',
},
{
    path: '/test',
    component: Test,
    exact: true,
    key: 'test',
},
];
