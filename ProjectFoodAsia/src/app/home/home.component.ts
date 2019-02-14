import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';




@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']

})

export class HomeComponent implements OnInit  {



constructor( private router: Router) { 
    //  console.log('home in constructor'); 

    }
    ngOnInit () {
        // console.log('home in NgOninit');
 }

//  to go to login page
OnSign() {
    this.router.navigate(['signup']);
}
}