import { makeAutoObservable } from 'mobx';


export default class AppStore {
  count = 0
   name = 'WYF';
   constructor ({count, name} = {count: 0, name: 'WYF'}) {
       this.count = count;
       this.name = name;
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
   initData (appStore) {
       return new Promise(
           function (resolve, reject) {
               appStore.name = 'EEE';
               appStore.count = 22;
               resolve(true);
           }
       );

   }
   toJson () {
       return {
           name: this.name,
           count: this.count,
       };
   }
}
