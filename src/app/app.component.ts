import { Component, OnInit } from '@angular/core';
import { ApiCallService } from './api-call.service';
import { IdxDbService } from './services/idx-db.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title='';
  constructor(private postService:ApiCallService,private indexDBService:IdxDbService){

  }
  sampletext:string='';
  ngOnInit(): void {
      this.getData();
  }
  getData(){
    this.postService.getdata().subscribe((response:any)=>{
      console.log(response);
      this.title=response['title']
    })
  }
 
  postData(){
    let  obj={
      name:this.sampletext
    }
    console.log(obj);
    this.postService.postData(obj).subscribe(response=>{
      console.log(response);
    },err=>{
    console.log(err);
    this.indexDBService.addUser(this.sampletext).then(this.backgroundSync).catch(console.log)
    })
  }

  backgroundSync(){
    navigator.serviceWorker.register('./service-worker.js');
    navigator.serviceWorker.ready.then((swRegistration)=>{
      swRegistration.sync.register('post-data').catch();
  })
  }
}
interface SyncManager {
  getTags(): Promise<string[]>;
  register(tag: string): Promise<void>;
}

declare global {
  interface ServiceWorkerRegistration {
    readonly sync: SyncManager;
  }
  
}