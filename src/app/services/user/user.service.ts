import { Injectable } from '@angular/core';
import { Usuario } from '../../entities/user.model';
import { AngularFireDatabase } from 'angularfire2/database';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
      private db: AngularFireDatabase,
  ) { }

  insert(usuario: Usuario) {
    this.db.list('user').push(usuario)
        .then((result: any) => {
          console.log(result.toString());
        })
  }

  update(usuario: Usuario) {
    this.db.list('pergunta').update(usuario.$key, usuario)
        .then((error: any) => {
          console.log(error.key);
        });
  }
}
