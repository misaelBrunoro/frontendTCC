import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class HttpUtilService {

  private API_URL = 'http://localhost:4200/';

  constructor(private router: Router) { }


  url(path: string) {
    return this.API_URL + path;
  }

  headers() {
    const headersParams = new Headers({ 'Content-Type': 'application/json' });

    if (localStorage['token']) {
      const authToken = localStorage['token'];
      headersParams.append('Authorization', `Bearer ${authToken}`);
    }

    const options = new RequestOptions({ headers: headersParams });
    return options;
  }

  extrairDados(response: Response) {
    const data = response.json();
    console.log(data);
    return data || {};
  }

  processarErros(erro: any) {

    if (erro.status === 401) {
      delete localStorage['user'];
      delete localStorage['token'];
      location.reload();
      this.router.navigate(['/login']);
    }

    return Observable.throw('Erro acessando servidor remoto.');
  }
}
