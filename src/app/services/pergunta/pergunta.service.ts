import { Injectable } from '@angular/core';
import { Pergunta } from 'app/entities/pergunta.model';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable({
  providedIn: 'root'
})
export class PerguntaService {
  private pergunta;

  constructor(
    private firestore: AngularFirestore,
  ) { }

  insert (data: Pergunta) {
    return this.firestore.collection('pergunta').add(data.getData()).then( res => 'sucess');
  }
}
