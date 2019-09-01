import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Pergunta } from '../../entities/pergunta.model';

@Injectable({
  providedIn: 'root'
})
export class PerguntaDataService {
  private  perguntaSource = new BehaviorSubject({ pergunta: null});
  currentPergunta = this.perguntaSource.asObservable();

  constructor() { }

  changePergunta(pergunta: Pergunta) {
    this.perguntaSource.next({pergunta: Pergunta});
  }
}
