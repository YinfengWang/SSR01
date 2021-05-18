import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {withRouter} from 'react-router-dom';
import { inject, observer } from 'mobx-react';


import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';

const styles = {
    root: {
        with: '100%',
        marginBottom: 80,
    },
    flex: {
        flex: 1,
    },
    btn: {
        marginRight: '15px',
    },
};

@inject((stores) => ({
    appStore: stores.appStore,
}))
@observer
class MainAppBar extends Component {

  homeIconButtonClick = () => {
      this.props.history.push('/list?tab=all');
  }
  createButtonClick = () => {
      if (this.props.appStore.user.isLogin) {this.props.history.push('/createTopic');} else {this.props.history.push('/user/login');}
  }
  loginButtonClick = () => {
      if (this.props.appStore.user.isLogin) {this.props.history.push('/user/info');} else {this.props.history.push('/user/login');}

  }
  render () {
      const {classes} = this.props;
      const user = this.props.appStore.user;
      return (
          <div className={classes.root}>
              <AppBar position='fixed'>
                  <Toolbar>
                      <IconButton variant="contained" color="primary" onClick={this.homeIconButtonClick}>
                          <HomeIcon color="action" />
                      </IconButton>
                      <Typography color="inherit" className={classes.flex} >
                          JNode
                      </Typography>
                      <Button variant="contained" color="secondary" onClick={this.createButtonClick} className={classes.btn}>
                          新建话题
                      </Button>
                      <Button color="default" onClick={this.loginButtonClick} >
                          {
                              user.isLogin ? user.info.loginname : '登录'
                          }
                      </Button>
                  </Toolbar>
              </AppBar>
          </div>
      );
  }
}
MainAppBar.propTypes = {
    history: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
};

MainAppBar.wrappedComponent.propTypes = {
    appStore: PropTypes.object.isRequired,
};
export default withStyles(styles)(withRouter(MainAppBar));
