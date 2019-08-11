import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';

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

    getAuth() {
        return this.afAuth.authState.map ( auth => auth)
    }

    logout() {
        return this.afAuth.auth.signOut();
    }
}
