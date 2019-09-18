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

  upload(caminho: string, aquivoParaUpload: any) {
    return this.afStorage.upload(caminho, aquivoParaUpload['Arquivo']);
  }
}
