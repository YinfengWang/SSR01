import {
    makeAutoObservable,
    extendObservable,
} from 'mobx';
import { topicSchema, replySchema} from '../util/variable-define';
import { get, post } from '../util/http';

const createTopic = (topic) => Object.assign({}, topicSchema, topic);
const createReply = (reply) => Object.assign({}, replySchema, reply);

class Topic {
    constructor (data) {
        extendObservable(this, data);
    }
  syncing = false
  createReplies=[]
  doReply=(content) => new Promise((resolve, reject) => {
      post(`/topic/${this.id}/replies`, {needAccessToken: true}, {content})
          .then((resp) => {
              if (resp.success) {
                  this.createReplies.push(createReply({
                      id: resp.reply_id,
                      content,
                      // eslint-disable-next-line camelcase
                      create_at: Date.now(),
                  }));
                  resolve();
              } else {
                  debugger;
                  reject(resp);
              }
          })
          .catch((err) => {
              debugger;
              reject(err);
          });
  })
}

class TopicStore {
  topics = []
  details=[]
  syncing = false
  createTopics=[]

  constructor ({ syncing = false, topics = [], details = []} = { }) {
      makeAutoObservable(this);
      this.syncing = syncing;
      this.topics = topics.map((topic) => new Topic(createTopic(topic)));
      this.details = details.map((topic) => new Topic(createTopic(topic)));
  }
  addTopic (topic) {
      this.topics.push(new Topic(createTopic(topic)));
  }
  detailsMap () {
      return this.details.reduce((result, detail) => {
          result[detail.id] = detail;
          return result;
      }, {});
  }
  fetchTopics (tab) {
      this.topics = [];

      return new Promise((resolve, reject) => {
          this.syncing = true;
          get('/topics', { mdrender: false, tab })
              .then((resp) => {
                  if (resp.success) {
                      resp.data.forEach((topic) => {
                          this.addTopic(topic);
                      });
                      this.syncing = false;
                      resolve();
                  } else {

                      this.syncing = false;

                      reject();
                  }
                  this.syncing = false;
              })
              .catch((err) => {
                  this.syncing = false;
                  reject(err);
              });

      });
  }

  getTopicDetail (id) {
      return new Promise((resolve, reject) => {
          if (this.detailsMap()[id]) {
              resolve(this.detailsMap()[id]);
          } else {
              get(`/topic/${id}`, {
                  mdrender: false,
              }).then((resp) => {
                  if (resp.success) {
                      const topic = new Topic(createTopic(resp.data));
                      this.details.push(topic);
                      resolve(topic);
                  } else {
                      reject();
                  }
              })
                  .catch(reject);
          }
      });
  }
  createTopic (title, tab, content) {
      return new Promise((resolve, reject) => {
          post('/topics', {needAccessToken: true}, {title, tab, content})
              .then((resp) => {
                  if (resp.success) {
                      const topic = {
                          title,
                          tab,
                          content,
                          id: resp.topic_id,
                          // eslint-disable-next-line camelcase
                          create_at: Date.now(),
                      };
                      this.createTopics.push(new Topic(createTopic(topic)));
                      resolve();
                  } else {
                      reject(resp);
                  }
              })
              .catch(reject);
      });
  }
}
export default TopicStore;
