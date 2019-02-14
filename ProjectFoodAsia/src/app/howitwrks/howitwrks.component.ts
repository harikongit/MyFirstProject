import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';


@Component({
  selector: 'app-howitwrks',
  templateUrl: './howitwrks.component.html',
  styleUrls: ['./howitwrks.component.css']
})
export class HowitwrksComponent implements OnInit {

  constructor(private router: Router) { 

    
    
      
  }

  ngOnInit() {

    
          this.router.navigate(['/howitwrks']);
   
    
  }

}
