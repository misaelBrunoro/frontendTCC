import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor( private _http: HttpClient ) { }

  getList() {

  }

  currentUser(): Promise<any> {
      return this._http.get<any>(environment.API_URL + '/users/current_user').toPromise();
  }

  alterarPerfil(body) {
    return this._http.post<any>(environment.API_URL + '/users/alterar_perfil', body, {
      observe: 'body',
    });
  }
}
