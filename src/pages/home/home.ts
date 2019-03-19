/*
  This is the home page that is navigated to once the user is loged in, it created the tabs for navigation and imports all the pages
*/

import { Component } from "@angular/core";
import { NavController, ModalController } from 'ionic-angular';
import { AddJobPage } from '../add-job-page/add-job-page'; // Adds the add job page to be loaded into a modal 
import { Jobs } from '../../providers/jobs'; // Imports the provider
//import { MapPage } from '../map/map'; // imports the job page to be opened from a tab
//import { ListPage } from '../list/list'; // imports the list page to be opened from a tab
import { JobPage } from '../job-list-page/job-list-page'; // imports the job page to be opened from a tab
import { AboutPage } from "../about/about";
//port { PlaceHomePage } from '../place-home/place-home'; //imports the places page to be navigated to


@Component({
  selector: 'home-page',
  templateUrl: 'home.html'
})
export class HomePage {
 
 tab1Root: any = JobPage; // sets the job page to be in tab 3
  tab2Root: any = AboutPage;
  jobs: any; // job variable for creating and deleting job
 
  constructor(public nav: NavController, public jobService: Jobs, public modalCtrl: ModalController) {
 
  }
 
  ionViewDidLoad(){
    // gets the job from the database
    this.jobService.getJobs().then((data) => {
      console.log(data);
      this.jobs = data;
    });
  }
 
 /*
  Function for adding job to the app, from the app.
 */
  addJob(){
    let modal = this.modalCtrl.create(AddJobPage); // opens a modal with the add job page
    //Once the modal is dismissed the job is pushed to the database.
    modal.onDidDismiss(job => {
      if(job){
        this.jobs.push(job);
        this.jobService.createJob(job);        
      }
    });
    modal.present();
  }
 
  deleteJob(job){
    //Remove the job locally
      let index = this.jobs.indexOf(job);
 
      if(index > -1){
        this.jobs.splice(index, 1);
      }   
    //Removes the job from the database
    this.jobService.deleteJob(job._id);
  }
}