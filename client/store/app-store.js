import { makeAutoObservable } from 'mobx';
import {post, get} from '../util/http';

export default class AppStore {
  user ={
      isLogin: false,
      info: [],
      detail: {
          recentTopics: [],
          recentReplies: [],
          syncing: false,
      },
      collection: {
          list: [],
          syncing: false,
      },
  }
  constructor () {
      makeAutoObservable(this);
  }
  login (accessToken) {
      return new Promise((resolve, reject) => {
          post('/user/login', {}, {
              accessToken,
          }).then((resp) => {
              if (resp.success) {
                  this.user.isLogin = true;
                  this.user.info = resp.data;
                  resolve();
              } else {
                  reject(resp);
              }
          })
              .catch(reject);
      });
  }
  getUserDetail () {
      this.user.detail.syncing = true;
      return new Promise((resolve, reject) => {
          get(`/user/${this.user.info.loginname}`).then((resp) => {
              if (resp.success) {
                  this.user.detail.recentReplies = resp.data.recent_replies;
                  this.user.detail.recentTopics = resp.data.recent_topics;
                  resolve();
              } else {
                  reject(resp);
              }
              this.user.detail.syncing = false;
          })
              .catch((err) => {
                  this.user.detail.syncing = false;
                  reject(err);
              }
              );
      });
  }

  getUserCollection () {
      this.user.collection.syncing = true;
      return new Promise((resolve, reject) => {
          get(`/topic_collect/${this.user.info.loginname}`).then((resp) => {
              if (resp.success) {
                  this.user.collection.list = resp.data;
                  resolve();
              } else {
                  reject(resp);
              }
              this.user.collection.syncing = false;
          })
              .catch((err) => {
                  this.user.collection.syncing = false;
                  reject(err);
              }
              );
      });
  }
}
