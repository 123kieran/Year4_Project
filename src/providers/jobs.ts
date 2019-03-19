import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
 
@Injectable()
export class Jobs {
 
  data: any;
 
  constructor(public http: Http) {
    this.data = null;
  }
 
 //Gets the job data
  getJobs(){
 
    if (this.data) {
      return Promise.resolve(this.data);
    }
 
    return new Promise(resolve => {
      //Here we are connecting to our hosted Node application containing our API so that app can get the data
      this.http.get('https://kierantradie.herokuapp.com/api/jobs')
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });
 
  }
 
  createJob(job){
 
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
 //Here we are connecting to our hosted Node application containing our API so that app can post the data
    this.http.post('https://kierantradie.herokuapp.com/api/jobs', JSON.stringify(job), {headers: headers})
      .subscribe(res => {
        console.log(res.json());
      });
 
  }
 
  deleteJob(id){
 //Here we are connecting to our hosted Node application containing our API so that app can delete the data
    this.http.delete('https://kierantradie.herokuapp.com/api/jobs/' + id).subscribe((res) => {
      console.log(res.json());
    });    
 
  }
 
}