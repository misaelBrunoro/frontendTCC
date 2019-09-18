import { Injectable } from '@angular/core';
import { AngularFireUploadTask,
         AngularFireStorage,
         AngularFireStorageReference } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class UploadFilesService {

  constructor(
    private afStorage: AngularFireStorage
  ) { }

  upload(Arquivo: any) {
    return this.afStorage.upload(Arquivo['Caminho'], Arquivo['File']);
  }
}
