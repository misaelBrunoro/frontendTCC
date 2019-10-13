import { environment } from '../../../environments/environment';
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
      headers: new HttpHeaders().append('authorization', localStorage.getItem('token'))
    });
  }

  update( ) {

  }

  delete(_id: string) {

  }

  getList() {
    return this._http.get<any>(environment.API_URL + '/perguntas', {
      observe: 'body',
      headers: new HttpHeaders().append('authorization', localStorage.getItem('token')),
    });
  }

  filteredItems(page, body) {
    return this._http.post<any>(environment.API_URL + '/perguntas/pagination', body, {
      observe: 'body',
      headers: new HttpHeaders().append('authorization', localStorage.getItem('token')),
      params: new HttpParams().append('page', page)
    });
  }

  detalhes(id) {
    return this._http.get<any>(environment.API_URL + '/perguntas/detalhes', {
      observe: 'body',
      headers: new HttpHeaders().append('authorization', localStorage.getItem('token')),
      params: new HttpParams().append('id', id)
    });
  }

  buscarPorID(page, id) {
    return this._http.get<any>(environment.API_URL + '/perguntas/buscarPorID', {
      observe: 'body',
      headers: new HttpHeaders().append('authorization', localStorage.getItem('token')),
      params: new HttpParams().append('page', page).append('id', id)
    });
  }

  responder(ID_pergunta, ID_resposta) {
    return this._http.get<any>(environment.API_URL + '/perguntas/responder', {
      observe: 'body',
      headers: new HttpHeaders().append('authorization', localStorage.getItem('token')),
      params: new HttpParams().append('ID_pergunta', ID_pergunta)
                              .append('ID_resposta', ID_resposta)
    });
  }
}
