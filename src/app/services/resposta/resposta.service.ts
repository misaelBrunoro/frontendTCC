import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RespostaService {

  constructor( private _http: HttpClient ) { }

  insert(body, ID_pergunta) {
    return this._http.post<any>(environment.API_URL + '/respostas/nova_resposta', body, {
      observe: 'body',
      params: new HttpParams().append('ID_pergunta', ID_pergunta)
    });
  }

  update(_id, body) {
    return this._http.put<any>(environment.API_URL + '/respostas/' + _id, body, {
      observe: 'body',
    });
  }

  getList() {
    return this._http.get<any>(environment.API_URL + '/respostas', {
      observe: 'body',
    });
  }

  getByID(id) {
    return this._http.get<any>(environment.API_URL + '/respostas/' + id, {
      observe: 'body',
    });
  }

  loadItems(page, ID_pergunta) {
    return this._http.get<any>(environment.API_URL + '/respostas/retorna_respostas', {
      observe: 'body',
      params: new HttpParams().append('page', page).append('ID_pergunta', ID_pergunta)
    });
  }

  oficializar(ID_pergunta, ID_resposta, ID_resposta_anterior) {
    return this._http.get<any>(environment.API_URL + '/respostas/oficializar', {
      observe: 'body',
      params: new HttpParams().append('ID_resposta', ID_resposta)
                              .append('ID_pergunta', ID_pergunta)
                              .append('ID_resposta_anterior', ID_resposta_anterior)
    });
  }
}
