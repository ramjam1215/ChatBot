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
  constructor(public afAuth: AngularFireAuth, private router: Router) { }

  login(userInfo: User) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(userInfo.email, userInfo.password)
        .then(res => {
          this.guard = true;
          console.log('sign in was good?');
          resolve(res);
        }, err => reject(err))
    })
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
