import { Injectable } from '@angular/core';
import { User } from './user';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { reject } from 'q';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  guard = false;
  constructor(private afAuth: AngularFireAuth, private router: Router) { }

  login(userInfo: User) {
    this.afAuth.auth.
      signInWithEmailAndPassword(userInfo.email, userInfo.password)
      .then(res => {
        console.log('Successfully signed in!');
        this.guard = true;
      })
      .catch(err => {
        console.log('Somethings is wrong...');
        console.log(err);
      });
  }

  isLoggedIn(): boolean {
    return this.guard;
  }

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

}
