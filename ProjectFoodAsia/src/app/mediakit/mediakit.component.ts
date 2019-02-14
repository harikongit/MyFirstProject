import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';


@Component({
  selector: 'app-mediakit',
  templateUrl: './mediakit.component.html',
  styleUrls: ['./mediakit.component.css']
})
export class MediakitComponent implements OnInit {

  constructor(private router: Router) { 
  
  }

  ngOnInit() {

    
          this.router.navigate(['/mediakit']);
 
    
  }

}
