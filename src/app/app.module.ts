import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';


import { LogIn } from '../pages/login/login';
import { CreateUser } from '../pages/create-user/create-user';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

// Firebase / AngularFire2 Stuff
// Adapted from https://www.joshmorony.com/building-a-crud-ionic-2-application-with-firebase-angularfire/

// Import the AF2 Module
import { AngularFireModule } from 'angularfire2';
import { Jobs } from '../providers/jobs';

// Info taken from my firebase account
export const firebaseConfig = {
  apiKey: "AIzaSyD2krnUR8pmVYtNQYviDeZNiyr4dhOukIw",
    authDomain: "tradeperson-8f2f6.firebaseapp.com",
    databaseURL: "https://tradeperson-8f2f6.firebaseio.com",
    projectId: "tradeperson-8f2f6",
    storageBucket: "tradeperson-8f2f6.appspot.com",
    messagingSenderId: "886537853173"
};



@NgModule({
  declarations: [   
    MyApp,
    LogIn,
    CreateUser,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
   

  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig) //initialise firebase
  ],
  bootstrap: [IonicApp],
  entryComponents: [    // entryComponents tells the offline template compiler to compile the components and create factories for them
    MyApp,
    LogIn,
    CreateUser,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
  
 
  ],
 // providers: [{provide: ErrorHandler, useClass: IonicErrorHandler},
   /// createJobService,
   // TodoServiceProvider ]
   providers: [{provide: ErrorHandler, useClass: IonicErrorHandler},  Jobs]
  })

export class AppModule {}
