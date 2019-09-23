import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AuthService {
    constructor( private _http: HttpClient ) {}

    register (body: any) {
        return this._http.post(environment.OAPI_URL + 'signup', body, {
            observe: 'body'
        });
    }

    login (body: any) {
        return this._http.post(environment.OAPI_URL + 'login', body, {
            observe: 'body'
        });
    }

    logout() {

    }
}
