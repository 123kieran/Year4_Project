import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LogIn } from '../login/login';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  constructor(public navCtrl: NavController) {

  }
  signOut(){
    this.navCtrl.push(LogIn); //push to login page
  }
}
