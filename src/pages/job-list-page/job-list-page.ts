import { Component } from "@angular/core";
import { Platform, NavController, NavParams, ModalController } from 'ionic-angular';
import {  AddJobPage } from '../add-job-page/add-job-page'; // imports the add job page to be navigated to
import { Jobs } from '../../providers/jobs'; //imports the job provider where we connect to our API.
import { MessagePage } from "../message/message";
 
@Component({
  selector: 'JobPage',
  templateUrl: 'job-list-page.html'
})
export class JobPage {
 
  jobs: any;

 
  constructor(public platform: Platform, public navCtrl: NavController, public navParams: NavParams, public jobService: Jobs, public modalCtrl: ModalController) {
 
  }
 
  ionViewDidLoad(){
    //Gets the job from the node server and displays them in the app
    this.jobService.getJobs().then((data) => {
      console.log(data);
      this.jobs = data;
    });
  }
 
  addJob(){
    //Creates the modal for adding job
    let modal = this.modalCtrl.create(AddJobPage);
    //when the modal has been dismissed the job is pushed to the Node server to be stored in the database.
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
    //Remove from database by sending data to the node server.
    this.jobService.deleteJob(job._id);
  }

  messageJob(){
    //Creates the modal for adding job
    this.navCtrl.push(MessagePage);
  }
}