import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
// Rxjs operators 
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { Observable } from 'rxjs/Observable';
// dynamic querying 
import {AngularFireAction} from 'angularfire2/database';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/switchMap';
import { FirebaseApp } from 'angularfire2/firebase.app.module';
import { DatabaseSnapshot } from 'angularfire2/database/interfaces';
import { ObservableInput } from 'rxjs/Observable';


@Injectable()
export class ProdscrollService {

  constructor(private db: AngularFireDatabase) { }

  // infinite scroll service
     // get items for pagination using snapshot changes
//  getProds(batch:any, lastKey?:any) :Observable<AngularFireAction<DatabaseSnapshot>[]>{

//   console.log("kastkey", lastKey);
//   console.log("batch", batch);

// if (lastKey) {
//   console.log("in last key")
//   // return  this.db.list('/test/customer/userData', ref =>
//   return  this.db.list('/test/product1', ref =>
//   ref.orderByKey().limitToFirst(batch).startAt(lastKey)
//   ).snapshotChanges().pipe(
// catchError(this.handleError1('getItemsPage', []))
// )
// } else {
//   console.log("in else part")
//   // return  this.db.list('/test/customer/userData', ref =>
//   return  this.db.list('/test/product1', ref =>
//   ref.orderByKey().limitToFirst(batch)
//   ).snapshotChanges().pipe(
//     tap(res=> console.log(res)),
// catchError(this.handleError1('getItemsPage', []))
// )
// }
 
// }



// get Products List 
// getProdList() {
//   // console.log("in prod list")
//   return  this.db.list('/test/product1').snapshotChanges()
//   .pipe(
//     tap(res=> console.log("response prod list",res)),
// catchError(this.handleError1('getItemsPage', []))
// )
// }


// search on merchant name
srchMerchant( ter: string) {

 

  if(ter == '10'){
     console.log("in between");
     return this.db.list('/test/product1', ref => ref.orderByChild('savings').startAt(0).endAt(10)).snapshotChanges().pipe(
     catchError(this.handleError1('getItemsPage', []))
)
  } else if(ter == '11'){

    console.log("in between");
    return this.db.list('/test/product1', ref => ref.orderByChild('savings').startAt(11).endAt(25)).snapshotChanges().pipe(
    catchError(this.handleError1('getItemsPage', [])))
  
  } else if(ter == '25'){

    console.log("in between")
    return this.db.list('/test/product1', ref => ref.orderByChild('savings').startAt(25).endAt(100)).snapshotChanges().pipe(
    catchError(this.handleError1('getItemsPage', [])))
  }
 

}


// getProdListg() {
//   // console.log("in prod list")
//   return  this.db.list('/test/product2').snapshotChanges()
//   .pipe(
//     tap(res=> console.log("response prod list",res)),
// catchError(this.handleError1('getItemsPage', []))
// )
// }


// search on merchant name
srchMerchantg( ter: string) {

 

  if(ter == '10'){
     console.log("in between");
     return this.db.list('/test/product2', ref => ref.orderByChild('savings').startAt(0).endAt(10)).snapshotChanges().pipe(
     catchError(this.handleError1('getItemsPage', []))
)
  } else if(ter == '11'){

    console.log("in between");
    return this.db.list('/test/product2', ref => ref.orderByChild('savings').startAt(11).endAt(25)).snapshotChanges().pipe(
    catchError(this.handleError1('getItemsPage', [])))
  
  } else if(ter == '25'){

    console.log("in between")
    return this.db.list('/test/product2', ref => ref.orderByChild('savings').startAt(25).endAt(100)).snapshotChanges().pipe(
    catchError(this.handleError1('getItemsPage', [])))
  }
 

}



  // common error handling method
private handleError1<T> (operation = 'operation', result?: T) {
  return (error: any) : Observable<T> => {
    // TODO: send the error to remote logging infrastructure
    console.log("in error handler");
    console.error(error); // log to console instead
    // TODO: better job of transforming error for user consumption
    console.log('${operation} failed: ${error.message}');
     // Let the app keep running by returning an empty result.
     return of(result as T);
    
  }
}




}
