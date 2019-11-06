import { Injectable } from '@angular/core';
import { User } from './user';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { reject } from 'q';
import { Router } from '@angular/router';
import { ChatService } from './chat/chat.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private bCheck = false;
  constructor(private afAuth: AngularFireAuth, private router: Router, private chatService: ChatService) { }

  login(userInfo: User) {
    this.afAuth.auth.
      signInWithEmailAndPassword(userInfo.email, userInfo.password)
      .then(res => {
        console.log('Successfully signed in!');
        this.bCheck = true;
        
      })
      .catch(err => {
        console.log('Somethings is wrong...');
        console.log(err);
      });
  }

  isLoggedIn(): boolean {
    return this.bCheck;
  }

  logOut() {
    this.afAuth.auth.signOut()
      .then(res => {
        console.log('sign out successfull!');
        this.bCheck = false;
        this.chatService.enableExit(false);
    })
      .catch(err => {
        console.log('Somethings is wrong...');
        console.log(err);
    });
  }
  /*
  logout() {
    return new Promise((resolve, reject) => {
      if (firebase.auth().currentUser) {
        this.afAuth.auth.signOut();
        resolve();
      }
      else {
        reject();
      }
    })

  }
  */
}
