import { Injectable } from "@angular/core";
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireDatabase } from "angularfire2/database";

@Injectable()

export class IndexService{


    constructor( private afAuth: AngularFireAuth, private db: AngularFireDatabase){}

    Strindex(index: string){
     return this.db.list(`/test/index`).update('index', index);
    }
}