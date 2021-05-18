import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core';

import UserWrapper from './user';
import loginStyles from './styles/login-style';

@inject((stores) => ({
    appStore: stores.appStore,
    user: stores.appStore.user,
}))
@observer
class UserLogin extends Component {
    constructor (props) {
        super(props);
        this.state = {
            accesstoken: '',
            helpText: '',
        };
    }
    static getDerivedStateFromProps (props, state) {
        if (props.user.isLogin) {
            props.history.replace('/user/info');
        }
        return null;
    }
  handleInput =(event) => {
      this.setState({accesstoken: event.target.value.trim()});
  }
  handleLogin=() => {
      if (!this.state.accesstoken) {
          return this.setState({helpText: '必须填写'});
      } else {
          this.setState({helpText: ''});
      }
      return this.props.appStore.login(this.state.accesstoken)
          .then(() => {
              this.props.history.replace('/user/info');
          })
          .catch((err) => {
              console.log(err);
          });
  }
  render () {
      const {classes} = this.props;
      return (
          <UserWrapper>
              <div className={classes.root}>
                  <TextField
                      label='请输入Cnode AccessToken'
                      placeholder='请输入Cnode AccessToken'
                      required
                      helperText={this.state.helpText}
                      value={this.state.accesstoken}
                      onChange={this.handleInput}
                      className={classes.input}
                  />
                  <Button
                      variant='contained'
                      color='secondary'
                      onClick={this.handleLogin}
                      className={classes.loginButton}
                  >
                  登录
                  </Button>
              </div>
          </UserWrapper>
      );
  }
}
UserLogin.propTypes = {
    classes: PropTypes.object.isRequired,
};
UserLogin.wrappedComponent.propTypes = {
    appStore: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
};
export default withStyles(loginStyles)(UserLogin);

