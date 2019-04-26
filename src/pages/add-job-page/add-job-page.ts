/*
  This is the typescript file for the AddJob page in our app where users can add there own job item.
*/

import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
 
@Component({
  selector: 'add-job-page',
  templateUrl: 'add-job-page.html'
})
export class AddJobPage {
 
  title: any;
  description: any;
  price: any;
  location:any;
 
  constructor(public viewCtrl: ViewController) {
 
  }
 
 /*
  The save() function saves a job to the mongo database provisioned to this app
 */
  save(): void {
    let job = { // the job item
      title: this.title, // the title of the job
      description: this.description, // the job description
      location: this.location,//job location
      price: this.price // the job price
    };
    this.viewCtrl.dismiss(job); // closes the add job page once added
  }
 
 /*
  The close() function closes the add job page when called
 */
  close(): void {
    this.viewCtrl.dismiss(); // closes the add job page
  }
}