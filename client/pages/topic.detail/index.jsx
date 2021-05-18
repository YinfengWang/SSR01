import React, { Component } from 'react';
import PropTypes from 'prop-types';
import marked from 'marked';
import { inject, observer } from 'mobx-react';
import Helmet from 'react-helmet';
import dateformat from 'dateformat';

import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';

import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import ReplyIcon from '@material-ui/icons/Reply';

import Container from '../layout/Container';
import { Paper, withStyles } from '@material-ui/core';
import Reply from './Reply';

import { topicDetailStyles } from './styles';


@inject((stores) => ({
    appStore: stores.appStore,
    topicStore: stores.topicStore,
    user: stores.appStore.user,
}))
@observer
class TopicDetail extends Component {
    constructor () {
        super();
        this.state = {
            newReply: '',
        };
    }
    componentDidMount () {
        this.getTopic();
    }
  handleNewReplyChange = (value) => {
      this.setState({ newReply: value });
  }
  doReply=() => {
      const topic = this.props.topicStore.detailsMap()[this.getTopicId()];
      topic.doReply(this.state.newReply)
          .then(() => {
              this.setState({newReply: ''});
          })
          .catch((err) => {
              console.log(err);
          });
  }
  handleToLogin=() => {
      this.props.history.push('/user/login');
  }
  getTopicId = () => this.props.match.params.id
  getTopic = () => this.props.topicStore.getTopicDetail(this.getTopicId())
  render () {
      const { classes, user } = this.props;
      const topic = this.props.topicStore.detailsMap()[this.getTopicId()];

      if (!topic) {
          return (
              <Container>
                  <section className={classes.loadingContainer}>
                      <CircularProgress color='secondary' />
                  </section>
              </Container>
          );
      } else {
          return (
              <div>
                  <Container>
                      <Helmet>
                          <title>{topic.title}</title>
                      </Helmet>
                      <header>
                          <h3>{topic.title}</h3>
                      </header>
                      <section>
                          <p dangerouslySetInnerHTML={{ __html: marked(topic.content) }} />
                      </section>
                  </Container>
                  {
                      topic.createReplies && topic.createReplies.length > 0 &&
                      <Paper elevation={4} className={classes.replies} >
                          <header className={classes.replyHeader}>
                              <span>我的最新回复</span>
                              <span>{`${topic.createReplies.length}条`}</span>
                          </header>
                          <section>
                              {
                                  topic.createReplies.map((reply) =>
                                      <Reply
                                          key={reply.id}
                                          reply={Object.assign({}, reply, {
                                              author: {
                                              // eslint-disable-next-line camelcase
                                                  avatar_url: user.info.avatar_url,
                                                  loginname: user.info.loginname,
                                              },
                                          })}
                                      />
                                  )
                              }
                          </section>
                      </Paper>
                  }
                  <Paper elevation={4} className={classes.replies}>
                      <header className={classes.replyHeader}>
                          <span>{`${topic.reply_count}      回复`}</span>
                          <span>{`最新回复 ${dateformat(topic.last_reply_at, 'yyyy-mm-dd HH:MM')}`}</span>
                      </header>
                      {
                          user.isLogin &&
                          <section className={classes.replyEditor}>
                              <SimpleMDE
                                  onChange={this.handleNewReplyChange}
                                  value={this.state.newReply}
                                  options={{
                                      autofocus: true,
                                      spellChecker: false,
                                      placeholder: '添加您的精彩回复',
                                  }}
                              />
                              <Button
                                  variant="contained"
                                  color="secondary"
                                  onClick={this.doReply}
                                  className={classes.replyButton}>
                                  <ReplyIcon/>
                              </Button>
                          </section>
                      }
                      {
                          !user.isLogin &&
                          <section className={classes.notLoginButton}>
                              <Button variant="outlined" color="secondary" onClick={this.handleToLogin}>
                                登录后进行回复
                              </Button>
                          </section>
                      }

                      <section>
                          {
                              topic.replies.map((reply) => <Reply reply={reply} key={reply.id} />)
                          }
                      </section>
                  </Paper>
              </div>
          );
      }
  }
}

TopicDetail.wrappedComponent.propTypes = {
    topicStore: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
};
export default withStyles(topicDetailStyles)(TopicDetail);
