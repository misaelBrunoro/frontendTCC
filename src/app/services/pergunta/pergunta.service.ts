import { environment } from './../../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PerguntaService {

  constructor( private _http: HttpClient ) { }

  insert (body: any) {
    return this._http.post<any>(environment.API_URL + '/perguntas/nova_pergunta', body, {
      observe: 'body',
    });
  }

  update( ) {

  }

  delete(_id: string) {

  }

  getList() {
    return this._http.get<any>(environment.API_URL + '/perguntas', {
      observe: 'body'
    });
  }

  filteredItems(page, body) {
    return this._http.post<any>(environment.API_URL + '/perguntas/pagination', body, {
      observe: 'body',
      params: new HttpParams().append('page', page)
    });
  }

  detalhes(id) {
    return this._http.get<any>(environment.API_URL + '/perguntas/detalhes', {
      observe: 'body',
      params: new HttpParams().append('id', id)
    });
  }

  getByID(id) {
    return this._http.get<any>(environment.API_URL + '/perguntas/getByID', {
      observe: 'body',
      params: new HttpParams().append('id', id)
    });
  }

  retornarDados() {
    return this._http.get<any>(environment.API_URL + '/perguntas/retornar_dados', {
      observe: 'body',
    });
  }
}
