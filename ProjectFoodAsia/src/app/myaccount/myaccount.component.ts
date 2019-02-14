import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';

@Component({
  selector: 'app-myaccount',
  templateUrl: './myaccount.component.html',
  styleUrls: ['./myaccount.component.css']
})
export class MyaccountComponent implements OnInit {

  constructor(private router: Router) { 
    
   
  }

  ngOnInit() {

    firebase.auth().onAuthStateChanged( user => {
      if(user) {
         
        this.router.navigate(['/scheme/account']); 
      } 
    }); 

  }

}
