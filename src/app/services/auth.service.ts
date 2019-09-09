import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable()
export class AuthService {
    constructor(
        public afAuth: AngularFireAuth
    ) {}

    registerUser (email: string, pass: string) {
        return new Promise((resolve, reject) => {
            this.afAuth.auth.createUserWithEmailAndPassword(email, pass)
            .then(userData => resolve(userData),
            err => reject(err));
        })
    }

    loginEmail (email: string, pass: string) {
        return new Promise((resolve, reject) => {
            this.afAuth.auth.signInWithEmailAndPassword(email, pass)
                .then(userData => resolve(userData),
                    err => reject(err));
        })
    }

    loginGoogle() {
        return this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    }

    loginFacebook() {
        return this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
    }

    loginTwitter() {
        return this.afAuth.auth.signInWithPopup(new firebase.auth.TwitterAuthProvider());
    }

    getAuth() {
        return this.afAuth.authState.map ( auth => auth)
    }

    logout() {
        return this.afAuth.auth.signOut();
    }
}
