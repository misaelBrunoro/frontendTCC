import { environment } from '../../../environments/environment';
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

  update( ) {

  }

  delete(_id: string) {

  }

  getList() {
    return this._http.get<any>(environment.API_URL + '/respostas', {
      observe: 'body',
    });
  }

  loadItems(page, ID_pergunta) {
    return this._http.get<any>(environment.API_URL + '/respostas/retorna_respostas', {
      observe: 'body',
      params: new HttpParams().append('page', page).append('ID_pergunta', ID_pergunta)
    });
  }

}
