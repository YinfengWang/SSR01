import { action, computed, makeAutoObservable, observable } from 'mobx';


export default class AppStore {
  @observable count = 0
  @observable name = 'WYF';
  constructor () {
      makeAutoObservable(this);
  }
  @computed get msg () {
      return `${this.name} say count is ${this.count} !`;
  }
  @action add () {
      this.count++;
  }
  @action changeName (name) {
      this.name = name;
  }

}
