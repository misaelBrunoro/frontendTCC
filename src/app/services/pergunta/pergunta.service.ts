import { Injectable } from '@angular/core';
import { Pergunta } from '../../entities/pergunta.model';
import { AngularFireDatabase } from 'angularfire2/database';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PerguntaService {

  constructor(
      private db: AngularFireDatabase,
  ) { }

  insert(pergunta: Pergunta) {
    this.db.list('pergunta').push(pergunta)
        .then((result: any) => {
          console.log(result.toString());
        })
  }

  update(pergunta: Pergunta) {
    this.db.list('pergunta').update(pergunta.$key, pergunta)
        .then((error: any) => {
          console.log(error.key);
        });
  }

  getAll() {
    this.db.list('pergunta')
        .snapshotChanges()
        .pipe(
            map(changes => {
              return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
            })
        )
  }

  delete(pergunta: Pergunta) {
    this.db.object('pergunta/' + pergunta.$key).remove();
  }
}
