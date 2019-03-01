/*
  This is the typescript file for the AddReview page in our app where users can add there own review item.
*/

import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
 
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
 
  title: any;
  description: any;
  rating: any;
 
  constructor(public viewCtrl: ViewController) {
 
  }
 
 /*
  The save() function saves a review to the mongo database provisioned to this app
 */
  save(): void {
    let job = { // the revew item
      title: this.title, // the title of the review
      description: this.description, // the review description
      rating: this.rating // the review rating
    };
    this.viewCtrl.dismiss(job); // closes the add review page once added
  }
 
 /*
  The close() function closes the add review page when called
 */
  close(): void {
    this.viewCtrl.dismiss(); // closes the add review page
  }
}