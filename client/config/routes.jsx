
import React from 'react';
import { Route, Redirect, withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';

import TopicList from '../pages/topic.list/index';
import UserLogin from '../pages/user/login';
import UserInfo from '../pages/user/info';
import CreateTopic from '../pages/topic.create';
import ToppicDetail from '../pages/topic.detail/index';
import Test from '../pages/test/Test';

const PrivateRoute = ({isLogin, component: Component, ...rest}) => (
    <Route
        {...rest}
        render={(props) => isLogin
            ? <Component {...props}/>
            : <Redirect
                to={{
                    pathname: '/user/login',
                    search: `?from=${rest.path}`,
                }}
            />}
    />
);

const InjectedPrivateRoute = withRouter(inject((stores) => ({
    isLogin: stores.appStore.user.isLogin,
}))(observer(PrivateRoute)));

PrivateRoute.propTypes = {
    isLogin: PropTypes.bool,
    component: PropTypes.element.isRequired,
};
PrivateRoute.defaultProps = {
    isLogin: true,
};

export default () => [
    <Route key='topic' path='/' render={() => <Redirect to='/list' />} exact/>,
    <Route key='topicList' path='/list' component={TopicList} />,
    <Route key='topicDetail' path='/detail:id' component={ToppicDetail} />,
    <Route key='UserLogin' path='/user/login' component={UserLogin} />,
    <Route key='UserInfo' path='/user/info' component={UserInfo} />,
    <InjectedPrivateRoute key='CreateTopic' path='/createTopic' component={CreateTopic} exact />,
];

// export const routes = () => [{
//     path: '/',
//     exact: true,
//     key: 'topic',
//     render: () => <Redirect to='/list' />,
// },
// {
//     path: '/user/login',
//     component: UserLogin,
//     exact: true,
//     key: 'UserLogin',
// },
// {
//     path: '/user/info',
//     component: UserInfo,
//     exact: true,
//     key: 'UserInfo',
// },
// {
//     path: '/list',
//     component: TopicList,
//     exact: true,
//     loadData: TopicList.loadData,
//     key: 'topicList',
// },
// {
//     path: '/detail/:id',
//     component: ToppicDetail,
//     exact: true,
//     key: 'topicDetail',
// },
// // {
// //     path: '/createTopic',
// //     component: CreateTopic,
// //     exact: true,
// //     key: 'CreateTopic',
// // },
// <InjectedPrivateRoute path='/createTopic' component={CreateTopic} exact key='CreateTopic'/>,
// {
//     path: '/test',
//     component: Test,
//     exact: true,
//     key: 'test',
// },
// ];
