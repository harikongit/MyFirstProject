import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { AuthService } from '../service/auth';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.css']
})
export class AboutusComponent implements OnInit {

  constructor(private router: Router, private authservice: AuthService) {

    // let user = firebase.auth().currentUser;
    // if (user){
    //   this.router.navigate(['/aboutus']);
    // } else {
    //   this.router.navigate(['/aboutus']);
    // }
   
   }

  ngOnInit() {

    // let user = this.authservice.ActiveUser().uid;
    firebase.auth().onAuthStateChanged((user) => {
      // if (user){
        this.router.navigate(['/aboutus']);
      // } else {
      //   this.router.navigate(['/aboutus']);
      // }
    });
          
     
        
      
  }

}
