import { Component, OnInit, ViewChild, ElementRef, NgZone, } from '@angular/core';
import { UserService } from '../service/user';
import { AuthService } from '../service/auth';
import { Address, CustomerDetAtSignUp, Addressnew } from '../models/customer';
import { KeyService } from '../service/key';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';


import { MatDialog, MatDialogConfig } from "@angular/material";
import { AlertdialogComponent } from '../alertdialog/alertdialog.component';
import * as firebase from 'firebase';



import {} from '@types/googlemaps';
import { MapsAPILoader } from '@agm/core';


@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})

export class AddressComponent implements OnInit {

  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;

  // form fields
  componentForm :any = {
    street_number: '',
    locality: '',
    administrative_area_level_1: '',
    country: '',
    postal_code: ''
  };

  val: any;
  addressType: any;

  @ViewChild("search")
  public searchElementRef: ElementRef;

clicka: boolean = true;
clicke: boolean = false;

  Add: Addressnew[];
  keyArray: any[];
  user: CustomerDetAtSignUp;
  firstnam: string;
  lastnam: string;
  phnumber: number;
  custemail: string;
  addForm: FormGroup;
  add: Addressnew;
  key: string;
  name: string = 'null';

  constructor(private mapsAPILoader: MapsAPILoader, private ngZone: NgZone, public dialog : MatDialog, private fb: FormBuilder, private keyservice: KeyService, private userservice: UserService, private authservice: AuthService) { 
    this.createForm();
    
    
  }

  ngOnInit() {

    firebase.auth().onAuthStateChanged( user => {
      if(user) {
        this.OnLoad(); 
        // this.router.navigate(['/profile']); 
      } 
    });
    
    this.Prior();
 }

Prior(){
  //set google maps defaults
  this.zoom = 4;
  this.latitude = 39.8282;
  this.longitude = -98.5795;
 console.log(this.latitude, this.longitude, this);
  //create search FormControl
  this.searchControl = new FormControl();

  //set current position
  this.setCurrentPosition();

  //load Places Autocomplete
  this.mapsAPILoader.load().then(() => {
    let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
      types: ["address"]
    });

    // Set initial restrict to the greater list of countries.
    autocomplete.setComponentRestrictions(
      {'country': ['ca']});

    autocomplete.addListener("place_changed", () => {
      this.ngZone.run(() => {
        //get the place result
        let place: google.maps.places.PlaceResult = autocomplete.getPlace();
         console.log("place is", place)
        //verify result
        if (place.geometry === undefined || place.geometry === null) {
          return;
        }
      this.OnReset();
       // Get each component of the address from the place details
     // and fill the corresponding field on the form.
     for (var i = 0; i < place.address_components.length; i++) {

       this.addressType = place.address_components[i].types[0];
       console.log("address type", this.addressType, this.componentForm[this.addressType], place.address_components[i].types[0]);
       
       if (this.addressType == place.address_components[i].types[0]) {

         this.componentForm[this.addressType] = place.address_components[i].long_name;
        //  console.log(this.addressType, this.componentForm[this.addressType]);
         // document.getElementById(addressType).value = val;
       } 
     }

        //set latitude, longitude and zoom
        this.latitude = place.geometry.location.lat();
        this.longitude = place.geometry.location.lng();
        this.zoom = 12;
      });
    });
  });
}

 // method
 private setCurrentPosition() {
   if ("geolocation" in navigator) {
     navigator.geolocation.getCurrentPosition((position) => {
       this.latitude = position.coords.latitude;
       this.longitude = position.coords.longitude;
       this.zoom = 12;
     });
   }
 }

OnLoad(){
  this.authservice.ActiveUser().getIdToken()
  .then((token: string) => {
  
        this.userservice.FetchDet(token).subscribe((data: CustomerDetAtSignUp) => {
          if(data){

          
         this.user = this.keyservice.conCust(data); 
         this.firstnam = this.user[0].custFirstName;
         this.lastnam = this.user[0].custLastName;
         this.phnumber = this.user[0].custPhoneMobile;
         this.custemail = this.user[0].custEmailId;
        }

      this.userservice.FetchAdd(token).subscribe((data1: Address[]) => {
        if(data1){
          
        
        this.Add = this.keyservice.conData(data1);
        this.keyArray = this.keyservice.getKey(data1);
        
        if(this.Add.length){

        
        for(let i=0; i<this.Add.length; i++ ){
  
            Object.assign(this.Add[i], { key: this.keyArray[i] });
        }
      }
    }else {
      this.Add = null;
    } 
      });

    
    });
  });
}

createForm() {
  this.addForm = this.fb.group({
    custStreetAddress: ['', [Validators.required]],
    custZipCode: ['', [Validators.required]],
    custCity: ['', [Validators.required]],
    custState: ['', [Validators.required]],    
    custCountry: ['', [Validators.required]],
   
    
  });
}




OnSave(){
  
   this.add = this.preSaveAdd();
   console.log(this.add);

   this.userservice.AddAddress(this.add.custStreetAddress, this.add.custZipCode, this.add.custCity,
                               this.add.custState, this.add.custCountry);
 
  
   this.authservice.ActiveUser().getIdToken()
   .then((token: string) => { 
        this.userservice.StrAdd(token).subscribe(() => { 
         this.openDialog('Address successfully added');
          this.OnLoad();
       });
   });
   this.addForm.reset();
  //  this.search = null; 
   
  
}


preSaveAdd(): Addressnew{
  const formModel = this.addForm.value;
  
  const saveAdd: Addressnew = {
    
    custStreetAddress: formModel.custStreetAddress as string,
    custZipCode : formModel.custZipCode as number, 
    custCity: formModel.custCity as string,
    custState: formModel.custState as string,
    custCountry: formModel.custCountry as string,     
    
  };

 
  return saveAdd;
}

OnAdd(){
  this.clicka = true;
  this.clicke = false;
  this.OnReset();
  // this.Prior();
}

OnEdit(add: any){
  this.clicke = true;
  this.clicka = false;
  this.key = add.key;
  this.rebuildForm(add);
}

OnUpdate() {
    this.add = this.preSaveAdd();
  
  //  this.rebuildForm();
   this.userservice.AddAddress(this.add.custStreetAddress, this.add.custZipCode, this.add.custCity,
                               this.add.custState, this.add.custCountry);
  //  this.rebuildForm();
  
  this.authservice.ActiveUser().getIdToken()
  .then((token: string) => { 
        this.userservice.UpdateAdd(token,this.key).subscribe(() => { 
          this.OnLoad();
          this.openDialog('Successfully Updated');
       });
  });
  this.addForm.reset(); 
}

rebuildForm(add: any) {
  
  this.addForm.reset({
    custStreetAddress: add.custStreetAddress,
    custZipCode : add.custZipCode, 
    custCity: add.custCity,
    custState: add.custState,
    custCountry: add.custCountry,     
    
  });
 
}

OnDel(add: any){
  this.authservice.ActiveUser().getIdToken()
  .then((token: string) => {
    this.userservice.DelAddress(token, add.key, add).subscribe(() => {
      this.OnLoad();
      this.openDialog('Address successfully deleted');
    });
  }).catch( err => { this.openDialog('Error is ' + err);  });
  
}

OnReset(){
  this.addForm.reset();
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
