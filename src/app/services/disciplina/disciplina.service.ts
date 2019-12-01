import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DisciplinaService {

    constructor( private _http: HttpClient ) { }

    insert (body) {
      return this._http.post<any>(environment.API_URL + '/disciplinas', body, {
          observe: 'body',
      });
    }
    update(id, body) {
      return this._http.put<any>(environment.API_URL + '/disciplinas/editar_disciplina', body, {
        observe: 'body',
        params: new HttpParams().append('id', id)
      });
    }

    getList() {
      return this._http.get<any>(environment.API_URL + '/disciplinas', {
        observe: 'body',
      });
    }

    filtrarDisciplinas(body) {
      return this._http.post<any>(environment.API_URL + '/disciplinas/filtrar_disciplinas', body, {
        observe: 'body',
      });
    }
}