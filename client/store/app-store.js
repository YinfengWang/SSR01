import { action, computed, makeAutoObservable, observable } from 'mobx';


export default class AppState {
  count = 0
  name = 'WYF';
  constructor () {
      makeAutoObservable(this, {
          count: observable,
          name: observable,
          msg: computed,
          add: action,
          changeName: action,
      });
  }
  get msg () {
      return `${this.name} say count is ${this.count} !`;
  }
  add () {
      this.count++;
  }
  changeName (name) {
      this.name = name;
  }

}


