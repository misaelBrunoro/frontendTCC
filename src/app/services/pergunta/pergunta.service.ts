import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PerguntaService {

  constructor( private _http: HttpClient ) { }

  insert ( ) {

  }

  update( ) {

  }

  delete(_id: string) {

  }

  getList() {
    return this._http.get(environment.OAPI_URL + '/signup', {
      observe: 'body',
      params: new HttpParams().append('token', localStorage.getItem('token'))
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
