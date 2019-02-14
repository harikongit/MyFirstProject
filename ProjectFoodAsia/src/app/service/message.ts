import { Injectable } from '@angular/core';
import { Message } from '../models/message';

@Injectable()

export class MessageService {

  message: Message;
  constructor() { }
  

  add(message: string, flag: string) {
    this.message = new Message(message, flag);
  }
 
  clear() {
    this.message = null;
  }

}
