import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DisciplinaService {

    constructor( private _http: HttpClient ) { }

    insert (body: any) {
        return this._http.post<any>(environment.API_URL + '/disciplinas', body, {
            observe: 'body',
        });
    }
    update( ) {

    }

    delete(_id: string) {

    }

    getList() {
        return this._http.get<any>(environment.API_URL + '/disciplinas', {
          observe: 'body',
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