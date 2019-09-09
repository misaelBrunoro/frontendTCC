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
    this.perguntasRef.add({...pergunta});
  }

  updatePergunta(key: string, value: any): Promise<void> {
    return this.perguntasRef.doc(key).update(value);
  }

  deletePergunta(key: string): Promise<void> {
    return this.perguntasRef.doc(key).delete();
  }

  getPerguntasList() {
    return this.perguntasRef.snapshotChanges();
  }
}
