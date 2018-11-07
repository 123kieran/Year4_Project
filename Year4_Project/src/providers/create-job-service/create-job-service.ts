  //todo-service.ts
  import {Injectable} from '@angular/core';
  import {Http, Headers} from '@angular/http';
  import {Observable} from 'rxjs/Observable';
  import 'rxjs/Rx';
  //import {createJob} from '../../createjobs.ts';
import { createJob } from '../../app/createJob';

  @Injectable()
  export class createJobService {
    createjobssUrl = "/api/createjobs"

    constructor(public http: Http) {}

    // Get all todos
    load(): Observable<createJob[]> {
      return this.http.get(this.createjobssUrl)
                 .map(res => res.json())
                 .catch(this.handleError);
    }

    handleError(error) {
      console.error(error);
      return Observable.throw(error.json().error || 'Server error');
    }
  }