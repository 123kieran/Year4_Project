import { Component } from '@angular/core';
import { Platform, NavController, NavParams, AlertController, LoadingController, ToastController } from 'ionic-angular';
import { AngularFireAuth, AuthProviders, AuthMethods } from 'angularfire2';

import { TabsPage } from '../tabs/tabs';



// Log In functions adapted from 
// https://devdactic.com/ionic-2-firebase/

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LogIn {


  loader: any;
  public user = {email: '', password: ''};
  public userAuth: boolean = this.navParams.get('userAuth'); 
  public fireauth = firebase.auth();
  public loggedIn = true;

  constructor(public platform: Platform, public navCtrl: NavController, public navParams: NavParams, public auth: AngularFireAuth, private alertCtrl: AlertController, private loadingCtrl: LoadingController, public toastCtrl: ToastController, ) {
    platform.registerBackButtonAction(() => {
        this.platform.exitApp();
    });
  }



// User Log In
  public loginhome() {
    let email = this.user.email; // example@email.com, original email address
    this.showLoading();
    this.auth.login(this.user, {
      provider: AuthProviders.Password,
        method: AuthMethods.Password 
    }).then((authData) => {
      this.loader.dismiss();
     this.navCtrl.setRoot(TabsPage);
     this.navCtrl.push(TabsPage,{email});  //push the email to tv page
    }).catch((error) => {
      this.showError(error); // if log in is unsuccessful show error
    });
   
  } // end log in



// let user know it's loading...
  showLoading() {
    this.loader = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loader.present();
  }

// Show user an error
   showError(text) {
    setTimeout(() => {
      this.loader.dismiss();
    });
 
    let prompt = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    prompt.present();
    
  }

}