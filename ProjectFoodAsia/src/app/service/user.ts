import { Injectable } from "@angular/core";
import { CustomerDetAtSignUp, CustomerDet, Address, Addressnew } from "../models/customer";
import { Http } from "@angular/http";
import { AuthService } from "./auth";
import 'rxjs/Rx';
import { Response } from "@angular/http/src/static_response";
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireDatabase } from "angularfire2/database";
import { catchError } from "rxjs/operators";
import { ErrhandlerService } from "./errhandler";
import { ContactDet } from "../models/ContactDet";

@Injectable() 

export class UserService {

Cust: CustomerDetAtSignUp;
Customer: CustomerDet;
Address: Addressnew;
userId: string;
contact: ContactDet;
    custGiftVoucherIssued: string;
    custGiftAmount: number;

constructor(private errorservice: ErrhandlerService, private authservice: AuthService, private http: Http, private af: AngularFireAuth, private db: AngularFireDatabase) {

    this.af.authState.subscribe((auth) => {
        if (auth) this.userId = auth.uid
      });
}

AddCust(custId: string, custFirstName: string, custLastName: string, custPhoneMobile: number, custEmailId: string, uid: any) {
    this.userId = uid;

    this.custGiftVoucherIssued = 'No';
    this.custGiftAmount = 0;

    this.Cust = new CustomerDetAtSignUp(custId, custFirstName, custLastName, custPhoneMobile, custEmailId, this.custGiftVoucherIssued, this.custGiftAmount);
    this.StrDet(this.userId);
}

getCust(){
    return this.Cust;
}


StrDet(uid: string) {
    this.db.list(`/test/customer/userData/${uid}/`).push(this.Cust);
        
    
}

UpdateUser(token: string, custId: string, custFirstName: string, custLastName: string, custPhoneMobile: number, custEmailId: string, key: string){
    
    let userId = this.authservice.ActiveUser().uid;
    return this.http.patch('https://my-hasha-app.firebaseio.com/test/customer/userData/'+ userId +'/'+ key +'/.json/?auth='+ token, { custEmailId: custEmailId, custFirstName: custFirstName, custLastName: custLastName, custId: custId, custPhoneMobile: custPhoneMobile });
}


FetchDet(token: string) {
    let uid = this.authservice.ActiveUser().uid;
    return this.http.get('https://my-hasha-app.firebaseio.com/test/customer/userData/'+ uid +'/.json/?auth='+ token)
    .map((res: Response) => { return res.json(); } ).pipe(catchError(this.errorservice.handleError<any>('Fetch Det at signup', "S"))) ;
}



// User Full Personal Details Update 
AddCustomer( custId: string, custName: string, custPhoneMobile: number, custEmailId: string, custGender: string, custDOB: Date, custStatus: string) {

    this.Customer = new CustomerDet( custId, custName, custPhoneMobile, custEmailId, custGender, custDOB, custStatus);

   
}

StrCustomer(token: string) {
    let uid = this.authservice.ActiveUser().uid;
    return this.http.put('https://my-hasha-app.firebaseio.com/test/customer/userFullData/PersonalDetails/'+ uid +'/.json/?auth='+ token, this.Customer)
    .map((res: Response) => { return res.json(); } ).pipe(catchError(this.errorservice.handleError<any>('Store Cust Full Data', "S"))) ; 
}

FetchCustomer(token: string) {
    let uid = this.authservice.ActiveUser().uid;
    return this.http.get('https://my-hasha-app.firebaseio.com/test/customer/userFullData/PersonalDetails/'+ uid +'/.json/?auth='+ token)
    .map((res: Response) => { return res.json(); } ).pipe(catchError(this.errorservice.handleError<any>('Fetch Cust Full Data', "S"))) ; 
}


// User Address
AddAddress( custStreetAddress: string, custZipCode: number, custCity: string, custState: string, custCountry: string) {

    this.Address = new Addressnew( custStreetAddress, custZipCode, custCity, custState, custCountry);

    
}

StrAdd(token: string) {
    let uid = this.authservice.ActiveUser().uid;
    return this.http.post('https://my-hasha-app.firebaseio.com/test/customer/userFullData/Address/'+ uid +'/.json/?auth='+ token, this.Address)
    .map((res: Response) => { return res.json(); } ).pipe(catchError(this.errorservice.handleError<any>('Store Cust Full Add', "S"))) ; 
}

FetchAdd(token: string) {
    let uid = this.authservice.ActiveUser().uid;
    return this.http.get('https://my-hasha-app.firebaseio.com/test/customer/userFullData/Address/'+ uid +'/.json/?auth='+ token)
    .map((res: Response) => { return res.json(); } ).pipe(catchError(this.errorservice.handleError<any>('Fetch Cust Full Add', "S"))) ; 
}


UpdateAdd(token: string, key: string) {
    let uid = this.authservice.ActiveUser().uid;
    return this.http.put('https://my-hasha-app.firebaseio.com/test/customer/userFullData/Address/'+ uid +'/'+ key + '.json/?auth='+ token, this.Address)
    .map((res: Response) => { return res.json(); } ).pipe(catchError(this.errorservice.handleError<any>('Update Cust Full Data', "S"))) ; 
}


DelAddress(token: string, key: string, add: Address) {
    
    let userid = this.authservice.ActiveUser().uid;
   this.StrDelAddress(token, userid, add, key).subscribe(() => {
        console.log('success'); 
        
    });
    return this.http.delete('https://my-hasha-app.firebaseio.com/test/customer/userFullData/Address/'+ userid +'/'+ key +'/.json?auth='+ token);
    
}


StrDelAddress(token: string, userid: string, add: Address, key: string){

    return this.http.put('https://my-hasha-app.firebaseio.com/test/del_address/'+ userid +'/'+ key +'/.json?auth='+ token, add ).pipe(catchError(this.errorservice.handleError<any>('Store Del Beneficiary', "S"))) ;
}



// Contact Details
AddContDet(name: string, email: string, subject: string, message: string){

      this.contact = new ContactDet(name, email, subject, message);
    //   this.StrCont();
}

StrCont(){
   return this.db.list(`/test/contactDet/`).push(this.contact);
}


UpdateGiftVoucher(token: string, key: string){
    
    let amount = 10;
    let userId = this.authservice.ActiveUser().uid;
    
    return this.http.patch('https://my-hasha-app.firebaseio.com/test/customer/userData/'+ userId +'/'+ key +'/.json/?auth='+ token, { custGiftVoucherIssued: 'Yes', custGiftAmount: amount });
}
}