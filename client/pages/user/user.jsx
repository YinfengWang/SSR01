import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';

import Avatar from '@material-ui/core/Avatar';
import UserIcon from '@material-ui/icons/AccountCircle';

import Container from '../layout/Container';
import { withStyles } from '@material-ui/core';

import userStyles from './styles/user-style';
@inject((stores) => ({ user: stores.appStore.user}))
@observer
class User extends Component {
    constructor (props) {
        // dvsdv
        super(props);
    }
    WW () {
        //
    }
    render () {
        const {classes} = this.props;
        const {isLogin, info} = this.props.user;
        return (
            <Container>
                <div className={classes.avatar}>
                    <div className={classes.bg}/>
                    {
                        info.avatar_url
                            ? <Avatar className={classes.avatarImg} src={info.avatar_url}/>
                            : <Avatar className={classes.avatarImg}>
                                <UserIcon />
                            </Avatar>
                    }
                    <span className={classes.userName}>{info.loginname || '未登录'}</span>
                </div>
                {
                    this.props.children
                }
            </Container>
        );
    }
}
User.wrappedComponent.propTypes = {
    user: PropTypes.object.isRequired,
};
User.propTypes = {
    children: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
};
export default withStyles(userStyles)(User);
