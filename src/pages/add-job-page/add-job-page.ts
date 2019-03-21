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
 
  constructor(public viewCtrl: ViewController) {
 
  }
 
 /*
  The save() function saves a job to the mongo database provisioned to this app
 */
  save(): void {
    let job = { // the revew item
      title: this.title, // the title of the job
      description: this.description, // the job description
      price: this.price // the job rating
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