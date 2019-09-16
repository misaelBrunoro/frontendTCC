import { Injectable } from '@angular/core';
import { Pergunta } from 'app/entities/pergunta.model';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class PerguntaService {
  private dbPath = '/perguntas';

  perguntasRef: AngularFirestoreCollection<Pergunta> = null;

  constructor(
    private firestore: AngularFirestore,
  ) { this.perguntasRef = firestore.collection(this.dbPath); }

  insert (pergunta: Pergunta) {
    return this.perguntasRef.add({...pergunta});
  }

  updatePergunta(key: string, value: any) {
    return this.perguntasRef.doc(key).update(value);
  }

  deletePergunta(key: string) {
    return this.perguntasRef.doc(key).delete();
  }

  getPerguntasList() {
    return this.perguntasRef.snapshotChanges();
  }

  // Paginacao
  loadItems() {
    return this.firestore.collection('perguntas', ref => ref
        .limit(10)
        .orderBy('dataPublicacao', 'desc'))
        .snapshotChanges();
  }

  prevPage(firstInResponse, get_prev_startAt) {
    return this.firestore.collection('perguntas', ref => ref
      .orderBy('dataPublicacao', 'desc')
      .startAt(get_prev_startAt)
      .endBefore(firstInResponse)
      .limit(10)
      ).get()
  }

  nextPage(lastInResponse) {
    return this.firestore.collection('perguntas', ref => ref
      .limit(10)
      .orderBy('dataPublicacao', 'desc')
      .startAfter(lastInResponse)
    ).get()
  }
}
