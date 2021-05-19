import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import Helmet from 'react-helmet';
import queryString from 'query-string';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import List from '@material-ui/core/List';
import CircularProgress from '@material-ui/core/CircularProgress';

import Container from '../layout/Container';
import TopicListItem from './list.item';
import { tabs } from '../../util/variable-define';
@inject((stores) => ({
    appStore: stores.appStore,
    topicStore: stores.topicStore,
}))
@observer
class TopicList extends React.Component {

    componentDidMount () {
        this.props.topicStore.fetchTopics(this.getTab());
    }
    // eslint-disable-next-line camelcase
    UNSAFE_componentWillReceiveProps (nextProps) {

        if (nextProps.location.query !== this.props.location.query) {
            debugger;
            this.props.topicStore.fetchTopics(this.getTab(nextProps.location.query));
        }
    }
  changeTab = (e, value) => {
      this.props.history.push({
          pathname: '/list',
          query: `?tab=${value}`,
      });
  }
  getTab = (queryStr) => {
      queryStr = queryStr || this.props.history.location.query;
      const query = queryString.parse(queryStr);
      return query.tab || 'all';
  }
  listItemClick = (topic) => {
      this.props.history.push(`/detail/${topic.id}`);
  }
  render () {

      const { topicStore } = this.props;

      const topicList = topicStore.topics;
      const syncingTopics = topicStore.syncing;
      const {createTopics, appStore} = topicStore;
      const {user} = this.props.appStore;

      return (
          <Container>
              <Helmet>
                  <title>This is topic list !</title>
                  <meta name="description" content="This is description" />
              </Helmet>
              <Tabs value={this.getTab()} onChange={this.changeTab}>
                  {
                      Object.keys(tabs).map((tab) => (
                          <Tab label={tabs[tab]} value={tab} key={tab} />
                      ))
                  }
              </Tabs>
              {
                  (createTopics && createTopics.length > 0) && (
                      <List style={{backgroundColor: 'lightblue'}}>
                          {
                              createTopics.map((topic, index) => (
                                  <TopicListItem
                                      onClick={() => this.listItemClick(topic)}
                                      topic={Object.assign({}, topic, {
                                          author: user.info,
                                      })}
                                      key={index} />
                              ))
                          }

                      </List>)
              }
              <List>
                  {
                      topicList.map((topic, index) => (<TopicListItem onClick={() => this.listItemClick(topic)} topic={topic} key={index} />))
                  }

              </List>
              {
                  syncingTopics ? <div style={{ display: 'flex', justifyContent: 'space-around', padding: '40px' }}><CircularProgress color="secondary" size={100} /></div> : null
              }
          </Container>
      );
  }
}


TopicList.wrappedComponent.propTypes = {
    topicStore: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    appStore: PropTypes.object.isRequired,
};

export default TopicList;
