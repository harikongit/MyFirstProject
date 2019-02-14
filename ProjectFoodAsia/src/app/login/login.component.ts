import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../service/user';
import * as firebase from 'firebase';

import { Idle, DEFAULT_INTERRUPTSOURCES, AutoResume } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';

import { MatDialog, MatDialogConfig } from "@angular/material";
import { AlertdialogComponent } from '../alertdialog/alertdialog.component';
// idle
// import { UserIdleService } from 'angular-user-idle';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isAuthenticated: boolean = false;
  name: string;
  index: string;


  idleState = 'Not started.';
timedOut = false;
lastPing?: Date ;


  constructor( public dialog : MatDialog, private idle: Idle, private keepalive: Keepalive,  private activated: ActivatedRoute, private userservice: UserService, private router : Router , private authservice: AuthService) { 
    // console.log('login in constructor');
    
        firebase.auth().onAuthStateChanged( user => {

          if(!user){
            this.router.navigate(['/login']);
          }
        });

  








     // sets an idle timeout of 5 seconds, for testing purposes.
idle.setIdle(600);
// console.log('idle');
// sets a timeout period of 5 seconds. after 10 seconds of inactivity, the user will be considered timed out.
idle.setTimeout(5);
// sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);
idle.setAutoResume(AutoResume.notIdle);

idle.onIdleEnd.subscribe(() => this.idleState = 'No longer idle.');
idle.onTimeout.subscribe(() => {
this.idleState = 'Timed out!';
this.timedOut = true;
console.log(idle.watch);
firebase.auth().signOut();
});
idle.onIdleStart.subscribe(() => this.idleState = 'You\'ve gone idle!');
idle.onTimeoutWarning.subscribe((countdown:any) => 
{
  this.idleState = 'You will time out in ' + countdown + ' seconds!';
  console.log(this.idleState, countdown);

});



// sets the ping interval to 15 seconds
keepalive.interval(15);

keepalive.onPing.subscribe(() => this.lastPing = new Date());

this.reset();
  
}

  ngOnInit() {

    
    
}


reset() {
  console.log('idle');
  this.idle.watch();
  this.idleState = 'Started.';
  this.timedOut = false;
}  



  OnSubmit(form: NgForm) {
    
    this.authservice.signIn(form.value.email, form.value.password)
    .then(() => { 
      
            let user = this.authservice.ActiveUser();
            console.log(user);

        if(user.emailVerified){

              this.isAuthenticated = true;
              this.router.navigate(['/scheme/subscriptions']);

        } else {

              this.openDialog('Please verify your email and then login');
              // this.router.navigate(['/login']);
              firebase.auth().signOut();
              
        }
    })
    .catch( error => { alert(error.message); });
    }
  
    OnLog(){
      this.router.navigate(['login']);
    }

  OnSign() {
    this.router.navigate(['signup']);
  }
 
  forgotPassword(email: string) {
    // console.log("email ID:", email)
    console.log(email);
    this.authservice.resetPassword(email);
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
