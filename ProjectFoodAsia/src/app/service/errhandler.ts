import { Injectable } from '@angular/core';

import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";
import { MessageService } from './message';

@Injectable()
export class ErrhandlerService {

  constructor(private msgService: MessageService ) { }

  // Error Handling 
/**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */

 handleError<T> (operation = 'operation', errType:string, result?: T) {
    return (error: any): Observable<T> => {
 
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
 
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message} errorTye:${errType}`);
 
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  
/** Log a HeroService message with the MessageService */
private log(message: string) {
    console.log ("message is;", message)
    this.msgService.add('All Deals: ' + message, 'red');
  }

}
