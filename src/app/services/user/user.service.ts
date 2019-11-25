import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor( private _http: HttpClient ) { }

  getList(tipo) {
    return this._http.get<any>(environment.API_URL + '/users/search_users', {
      observe: 'body',
      params: new HttpParams().append('tipo', tipo)
    });
  }

  currentUser(): Promise<any> {
      return this._http.get<any>(environment.API_URL + '/users/current_user').toPromise();
  }

  alterarPerfil(body) {
    return this._http.post<any>(environment.API_URL + '/users/alterar_perfil', body, {
      observe: 'body',
    });
  }

  ativarUser(ativo, id) {
    return this._http.get<any>(environment.API_URL + '/users/ativar_user', {
      observe: 'body',
      params: new HttpParams().append('ativo', ativo).append('_id', id)
    });
  }

  getByID(id) {
    return this._http.get<any>(environment.API_URL + '/users/user_porID', {
      observe: 'body',
      params: new HttpParams().append('_id', id)
    });
  }

  vincularDisciplina(id, vincular, user_id) {
    return this._http.get<any>(environment.API_URL + '/users/vincular_disciplina', {
      observe: 'body',
      params: new HttpParams().append('_id', id).append('vincular', vincular)
      .append('user_id', user_id)
    });
  }

  tornarMonitor(id, tipo) {
    return this._http.get<any>(environment.API_URL + '/users/tornar_monitor', {
      observe: 'body',
      params: new HttpParams().append('_id', id).append('_id', id)
      .append('tipo', tipo)
    });
  }
}
