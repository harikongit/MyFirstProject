import { Component } from '@angular/core';
import { Router } from '@angular/router';



import * as  firebase  from 'firebase';





@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'project';

  isAuthenticated= false;
  


  constructor( private router: Router) {



    

    // initializing app with Firebase

    firebase.initializeApp({
      apiKey: "AIzaSyAyz2L_l9EhiO7XNRr719wriuVtc1NtajU",
    authDomain: "my-hasha-app.firebaseapp.com",
    databaseURL: "https://my-hasha-app.firebaseio.com",
    projectId: "my-hasha-app",
    storageBucket: "my-hasha-app.appspot.com",
    messagingSenderId: "995196826620"
    
    });
  

    // Checking the condition if state is changed
    firebase.auth().onAuthStateChanged( user => {
      if(user) {
         
        if(user.email == 'sam@sam.com'){
          // this.isAuthenticated = false;
          this.router.navigate(['products']);

        } else {

          if(user.emailVerified){
            
            this.isAuthenticated= true;
            this.router.navigate(['/scheme/subscriptions']);
  
          }else {

            this.router.navigate(['/login']);
          }
         
             
        }
        
      } else {

              this.router.navigate(['/home']);
                
      
      }
    }); 




   
}




}
 

