import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { Jobs } from '../../providers/jobs';
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

 // tab1Root = HomePage;
  tab1Root = AboutPage;
  tab2Root = ContactPage;
  jobs: any; // review variable for creating and deleting reviews

  constructor(public nav: NavController, public jobService: Jobs, public modalCtrl: ModalController) {
 
  }
 
  ionViewDidLoad(){
    // gets the reviews from the database
    this.jobService.getJobs().then((data) => {
      console.log(data);
      this.jobs = data;
    });
  }
 
 /*
  Function for adding reviews to the app, from the app.
 */
  addJob(){
    let modal = this.modalCtrl.create(HomePage); // opens a modal with the add review page
    //Once the modal is dismissed the review is pushed to the database.
    modal.onDidDismiss(job => {
      if(job){
        this.jobs.push(job);
        this.jobService.createJob(job);        
      }
    });
    modal.present();
  }
 
  deleteReview(job){
    //Remove the review locally
      let index = this.jobs.indexOf(job);
 
      if(index > -1){
        this.jobs.splice(index, 1);
      }   
    //Removes the review from the database
    this.jobService.deleteJob(job._id);
  }
}
