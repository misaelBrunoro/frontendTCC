import { environment } from './../../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ComentarioService {

  constructor( private _http: HttpClient ) { }

  insert (body, ID_resposta) {
    return this._http.post<any>(environment.API_URL + '/comentarios/novo_comentario', body, {
      observe: 'body',
      params: new HttpParams().append('ID_resposta', ID_resposta)
    });
  }

  update( ) {

  }

  delete(_id: string) {

  }

  loadItems(ID_resposta) {
    return this._http.get<any>(environment.API_URL + '/comentarios/retorna_comentarios', {
      observe: 'body',
      params: new HttpParams().append('ID_resposta', ID_resposta)
    });
  }

}
