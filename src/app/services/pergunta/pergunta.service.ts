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
}
