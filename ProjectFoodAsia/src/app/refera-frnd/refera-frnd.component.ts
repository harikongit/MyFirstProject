import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';

@Component({
  selector: 'app-refera-frnd',
  templateUrl: './refera-frnd.component.html',
  styleUrls: ['./refera-frnd.component.css']
})
export class ReferaFrndComponent implements OnInit {

  constructor(private router: Router) {

    
  
   }

  ngOnInit() {

    
    firebase.auth().onAuthStateChanged( user => {
      if(user) {
          this.router.navigate(['/refer']);
      } else {
          this.router.navigate(['/refer']);
      }
    });  
    
  }

}
