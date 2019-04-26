/*
  This is the home page that is navigated to once the user is loged in, it created the tabs for navigation and imports all the pages
*/

import { Component } from "@angular/core";
import { NavController, ModalController } from 'ionic-angular';
import { JobPage } from '../job-list-page/job-list-page'; // imports the job page to be opened from a tab
import { AboutPage } from "../about/about";


@Component({
  selector: 'home-page',
  templateUrl: 'home.html'
})
export class HomePage {
 
 tab1Root: any = JobPage; // sets the job page to be in tab 3
  tab2Root: any = AboutPage;
  jobs: any; // job variable for creating and deleting job
 
  
 
}