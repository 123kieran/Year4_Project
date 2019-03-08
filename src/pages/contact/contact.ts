import { Component } from "@angular/core";
import { NavController, ModalController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Jobs } from '../../providers/jobs'; //imports the review provider where we connect to our API.
 
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
 
   jobs : any;

 /* doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    this.reviewService.getReviews().then((data) => {
      console.log(data);
      this.reviews = data;
    });
    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 5000);
  } //Here is our attmpt at refreshing the page */
 
  constructor(public nav: NavController, public jobService: Jobs, public modalCtrl: ModalController) {
 
  }
 
  ionViewDidLoad(){
    //Gets the reviews from the node server and displays them in the app
    this.jobService.getJobs().then((data) => {
      console.log(data);
      this.jobs = data;
    });
  }
 
  addJob(){
    //Creates the modal for adding review
    let modal = this.modalCtrl.create(HomePage);
    //when the modal has been dismissed the review is pushed to the Node server to be stored in the database.
    modal.onDidDismiss(job => {
      if(job){
        this.jobs.push(job);
        this.jobService.createJob(job);        
      }
    });
    modal.present();
  }
 
  deleteJob(job){
    //Remove the review locally
    let index = this.jobs.indexOf(job);
    if(index > -1){
      this.jobs.splice(index, 1);
    }   
    //Remove from database by sending data to the node server.
    this.jobService.deleteJob(job._id);
  }
}