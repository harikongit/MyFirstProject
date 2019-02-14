import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';


@Component({
  selector: 'app-press',
  templateUrl: './press.component.html',
  styleUrls: ['./press.component.css']
})
export class PressComponent implements OnInit {

  constructor(private router: Router) { 
    
    
   
  }

  ngOnInit() {

    
          this.router.navigate(['/press']);
  

  }

}
