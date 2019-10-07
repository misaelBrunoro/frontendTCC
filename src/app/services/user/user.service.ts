import { Usuario } from '../../entities/usuario.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor( private _http: HttpClient ) { }

  insert (usuario: Usuario) {

  }

  update(usuario: Usuario) {

  }

  delete(_id: string) {

  }

  getList() {

  }

  getUserBy_id(_id: string) {

  }
}
