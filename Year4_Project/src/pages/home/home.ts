  //home.ts
  import {Component} from "@angular/core";
 // import {ItemSliding, Item} from 'ionic-angular';
  import {createJobService} from '../../providers/create-job-service/create-job-service';
 // import {createJob} from '../../createJob.ts';
import { createJob } from "../../app/createJob";

  @Component({
    templateUrl: 'home.html',
    providers: [createJobService]
  })
  export class HomePage {
  public createjobs: createJob[];

  constructor(public createjobService: createJobService) {
    this.loadcreateJob();
  }

  loadcreateJob() {
    this.createjobService.load()
        .subscribe(data => {
          this.createjobs = data;
        })
    }
  }