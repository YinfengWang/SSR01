import { makeAutoObservable } from 'mobx';


export default class AppStore {
  count = 0
   name = 'WYF';
   constructor () {
       makeAutoObservable(this);
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
