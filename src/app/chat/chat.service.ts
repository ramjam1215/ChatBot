import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

import { ApiAiClient } from 'api-ai-javascript/es6/ApiAiClient';

import { Observable, BehaviorSubject } from 'rxjs';

// Message class for displaying messages in the component
export class Message {
  constructor(public content: string, public sentBy: string) { }
}

@Injectable()
export class ChatService {

  readonly token = environment.dialogflow.angularBot;
  readonly client = new ApiAiClient({ accessToken: this.token });
  private chatCheck = false;
  conversation = new BehaviorSubject<Message[]>([]);

  constructor() { }

  // Sends and receives messages via DialogFlow
  converse(msg: string) {
    //send
    const userMessage = new Message(msg, 'user');
    this.update(userMessage);

    //receive
    return this.client.textRequest(msg)
      .then(res => {
        const speech = res.result.fulfillment.speech;
        const botMessage = new Message(speech, 'bot');
        this.update(botMessage);
      });
  }

  enableExit(b: boolean): void { this.chatCheck = b; }

  toChat(): boolean {
    return this.chatCheck;
  }

  // Adds message to source
  update(msg: Message) {
    this.conversation.next([msg]);
  }

}
