import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PerguntaService {

  constructor( private _http: HttpClient ) { }

  insert (body: any) {
    return this._http.post(environment.API_URL + '/perguntas', body, {
      observe: 'body',
      headers: new HttpHeaders().append('authorization', localStorage.getItem('token'))
    });
  }

  update( ) {

  }

  delete(_id: string) {

  }

  getList() {
    return this._http.get(environment.API_URL + '/perguntas', {
      observe: 'body',
      headers: new HttpHeaders().append('authorization', localStorage.getItem('token'))
    });
  }

  // Paginacao
  loadItems() {

  }

  prevPage( ) {

  }

  nextPage( ) {

  }
}
