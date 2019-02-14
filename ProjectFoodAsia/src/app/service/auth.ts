import * as firebase  from "firebase/app";


import { Observable } from 'rxjs/Observable';
import { switchMap } from 'rxjs/operators';
import { fromPromise } from 'rxjs/observable/fromPromise';

import { AngularFireAuth } from 'angularfire2/auth';
// import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import {AngularFireDatabase} from 'angularfire2/database';
// import { NotifyService } from './notify.service';
import { environment } from '../../environments/environment';
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";


import { MatDialog, MatDialogConfig } from "@angular/material";
import { AlertdialogComponent } from '../alertdialog/alertdialog.component';


@Injectable()
export class AuthService {


    
constructor(public dialog : MatDialog, private afAuth: AngularFireAuth, private router: Router) {
//   console.log("in authservce constructor");
}



AnonymousSignin(){
  return firebase.auth().signInAnonymously();
} 









signIn(email:string, password: string) {  

    return firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
    .then(()=> { 
            return firebase.auth().signInWithEmailAndPassword(email,password)
            
    }); 
            
}


signUp(email: string, password: string) {    
    return firebase.auth().createUserWithEmailAndPassword(email,password);
} 


LogOut() {  
  return  firebase.auth().signOut();
}


ActiveUser() {
        return firebase.auth().currentUser;
}

UpdateProfile(email: string, fname: string) {
    console.log("in udate profile email:", email);
  
    let user = firebase.auth().currentUser;
    
    user.updateProfile({
        displayName: fname,
        photoURL: "www.google.com"
    }).then (() => {
            user.updateEmail(email)
            .then(()=>console.log("email updated & Name updated"))
            // let user1 = this.ActiveUser();
            // console.log(user1);
            })  
          .catch(error => console.log(error));
        
}   
   

//  Send email verification after sign up
sendEmailVerification() {
    
    // [START sendemailverification]
    var user = firebase.auth().currentUser;
        
    return user.sendEmailVerification().then(() => {
        // Email Verification sent!
        // [START_EXCLUDE]
       this.openDialog('Email Verification Sent! Please verify and Log In with your Credentials');
        // [END_EXCLUDE]
        }).catch(error => console.log(error))
        // [END sendemailverification]
}


resetPassword(email: string) {
    const fbAuth = firebase.auth();    
    return fbAuth.sendPasswordResetEmail(email)
    .then(() => this.openDialog('Password update email sent. Please go through the link sent in mail.'))
    .catch((error) => this.openDialog(error.message));
} 


getUserIdToken(): Observable<string> {
    // console.log("get user ID toekn");  
    
    return fromPromise (this.afAuth.auth.currentUser.getIdToken() );
    
    }

// Alert
openDialog(a: string) {
    const dialogConfig = new MatDialogConfig();
  
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.hasBackdrop = false;
    dialogConfig.role = 'alertdialog';
  
    dialogConfig.data = {
        id: 1,
        title: a
        };
  
    dialogConfig.panelClass = "bckgrdcolor";
    dialogConfig.backdropClass = "myBack";
  
    dialogConfig.position = {
      top: '200px',
      // left: '200px'
  };
  
    const dialogRef = this.dialog.open(AlertdialogComponent, dialogConfig);
  
    dialogRef.afterClosed().subscribe(result => {
      console.log("Dialog was closed" );
     console.log("response: " + result) });
  } 

}