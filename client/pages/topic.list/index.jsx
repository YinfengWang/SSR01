import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import Helmet from 'react-helmet';
// 类的写法
@inject('appStore') @observer
class TopicList extends React.Component {
  onChange = (e) => {
      this.props.appStore.changeName(e.target.value);
  };
  render () {
      const appStore = this.props.appStore;
      console.log(appStore);
      return (<>
          <Helmet>
              <title>This is topic list !</title>
              <meta name="description" content="This is description" />
          </Helmet>
          <input type='text' onChange={this.onChange} />
          <div>{this.props.appStore.msg}</div>
      </>);
  }
}

TopicList.propTypes = {
    appStore: PropTypes.object.isRequired, // correct
};

TopicList.loadData = (stores) => stores.appStore.initData(stores.appStore);

export default TopicList;
