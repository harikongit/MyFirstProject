import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';


@Component({
  selector: 'app-followus',
  templateUrl: './followus.component.html',
  styleUrls: ['./followus.component.css']
})
export class FollowusComponent implements OnInit {

  constructor(private router: Router) {

   
         
    
  
   }

  ngOnInit() {
    
   
          this.router.navigate(['/follow']);
    

  }

}
