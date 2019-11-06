import { Component, OnInit } from '@angular/core';
import { ChatService, Message } from '../chat.service';
import { Observable } from 'rxjs';
import { scan } from 'rxjs/operators';

import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'chat-dialog',
  templateUrl: './chat-dialog.component.html',
  styleUrls: ['./chat-dialog.component.css']
})
export class ChatDialogComponent implements OnInit {

  messages: Observable<Message[]>; 
  formValue: string;

  constructor(public chatService: ChatService, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    // appends to array after each new message is added to feedSource
    this.messages = this.chatService.conversation.pipe(
      scan((acc, val) => acc.concat(val)));
  }

  sendMessage() {
    this.chatService.converse(this.formValue);
    this.formValue = '';
  }

  logOut() {
    this.authService.logOut();
    this.router.navigateByUrl('/login');
  }

}
