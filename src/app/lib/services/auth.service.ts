import { Injectable } from '@angular/core';
import {UserInterface} from "../interfaces/user.interface";
import {AngularFireAuth} from "@angular/fire/compat/auth";

import {GoogleAuthProvider} from "firebase/auth"
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Router} from "@angular/router";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authStorageKey: string = 'auth_user';
  authInstance = new BehaviorSubject(this.getUser());

  constructor(
    public afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {}

  async signInWithGoogle() {
    return await this.authLoginMethod(new GoogleAuthProvider(), 'google');
  }

  async signInWithPassword(user: {email: string, password: string}) {
    return await this.authLoginMethod(user, 'password');
  }

  getUser(): UserInterface | null {
    const user = localStorage.getItem(this.authStorageKey);

    if (user) {
      return JSON.parse(user);
    }

    return null;
  }

  setUser(userInfo: UserInterface) {
    localStorage.setItem(this.authStorageKey, JSON.stringify(userInfo));
    // @ts-ignore
    this.authInstance.next(userInfo);
  }

  async authLoginMethod(provider: any = null, type: string = '') {
    try {
      if (type === 'google') {
        let result = await this.afAuth.signInWithPopup(provider);

        if (result) {
          let userData = {...result.additionalUserInfo?.profile, ...result.credential, role: 'user'};

          if (result.additionalUserInfo && result.additionalUserInfo.isNewUser) {
            // @ts-ignore
            await this.afs.collection('users').doc(userData['email']).set(userData)
          }

          this.setUser(userData);
          await this.router.navigate([''])
        } else {
          console.log('Auth Error');
        }
      } else {
        let result = await this.afAuth.signInWithEmailAndPassword(provider.email, provider.password);

        if (result && result.user) {
          let userData = {idToken: result.user.refreshToken, email: result.user.email, role: 'user'};

          if (result.additionalUserInfo && result.additionalUserInfo.isNewUser) {
            // @ts-ignore
            await this.afs.collection('users').doc(userData['email']).set(userData)
          }

          this.setUser(userData);
          await this.router.navigate([''])
        }
      }

      return true;
    } catch (err) {
      return false;
    }
  }

  async signOut() {
    await this.afAuth.signOut();
    localStorage.clear()
    this.authInstance.next(null);

    await this.router.navigate(['login'])
  }
}
