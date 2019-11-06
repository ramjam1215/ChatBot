import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { ChatService } from './chat/chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  constructor(public authService: AuthService, public chatService: ChatService) { }

  toRoute(): boolean {
    return this.authService.isLoggedIn();
  }

  toChat(): void {
    console.log('chat ref clicked');
    this.chatService.enableExit(true);
  }

  logOut(): void {
    console.log('logout ref clicked');
    this.authService.logOut();
  }

  didLogin(): boolean {
    return this.chatService.toChat();
  }
}
