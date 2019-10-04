import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RespostaService {

  constructor( private _http: HttpClient ) { }

  insert (body: any) {
    return this._http.post<any>(environment.API_URL + '/respostas', body, {
      observe: 'body',
      headers: new HttpHeaders().append('authorization', localStorage.getItem('token'))
    });
  }

  update( ) {

  }

  delete(_id: string) {

  }

  getList() {
    return this._http.get<any>(environment.API_URL + '/respostas', {
      observe: 'body',
      headers: new HttpHeaders().append('authorization', localStorage.getItem('token')),
    });
  }

  loadItems(page, body) {
    return this._http.post<any>(environment.API_URL + '/respostas/pagination', body, {
      observe: 'body',
      headers: new HttpHeaders().append('authorization', localStorage.getItem('token')),
      params: new HttpParams().append('page', page)
    });
  }
}
