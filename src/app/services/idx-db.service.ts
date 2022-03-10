import { Injectable } from '@angular/core';
import { DBSchema, IDBPDatabase, openDB } from 'idb';
@Injectable({
  providedIn: 'root'
})
export class IdxDbService {
  private db!:IDBPDatabase<myDB>;
  constructor() { 
    this.connectToDb();
  }
  
  async connectToDb(){
    this.db=await openDB('my-db',1,{
      upgrade(db){
        db.createObjectStore('user-store');
      }
    })
  }
  addUser(name:string){
    return this.db.put('user-store',name,'name')
  }
  deleteUser(key:string){
    return this.db.delete('user-store',key)
  }
}
interface myDB extends DBSchema{
  'user-store':{
    key:string,
    value:string
  }
}