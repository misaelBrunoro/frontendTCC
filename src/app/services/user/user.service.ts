import { Usuario } from './../../entities/user.model';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private dbPath = '/users';
  usersRef: AngularFirestoreCollection<Usuario> = null;

  constructor(
    private firestore: AngularFirestore,
  ) { this.usersRef = firestore.collection(this.dbPath); }

  insert (usuario: Usuario) {
    return this.usersRef.add({...usuario});
  }

  updateUsuario(key: string, value: any) {
    return this.usersRef.doc(key).update(value);
  }

  deleteUsuario(key: string) {
    return this.usersRef.doc(key).delete();
  }

  getUsuarioList() {
    return this.usersRef.snapshotChanges();
  }

  getUserByKey(key: string) {
    return this.firestore.collection('users', ref => ref
        .where('key', '==', key))
        .snapshotChanges();
  }
}
