import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';

@Injectable({
    providedIn: 'root'
})

export class ChatService {
    private socket;

    constructor(private _http: HttpClient) {
        this.socket = io(environment.FREE_URL);
    }

    joinRoom(data) {
        this.socket.emit('join', data);
    }

    newUserJoined() {
        const observable = new Observable<{user_id: String, user: String, message: String}>(observer => {
            this.socket.on('novo usuário entrou', (data) => {
                observer.next(data);
            });
            return () => { this.socket.disconnect(); }
        });

        return observable;
    }

    leaveRoom(data) {
        this.socket.emit('leave', data);
    }

    userLeftRoom() {
        const observable = new Observable<{user_id: String, user: String, message: String}>(observer => {
            this.socket.on('saiu da sala', (data) => {
                observer.next(data);
            });
            return () => { this.socket.disconnect(); }
        });

        return observable;
    }

    sendMessage(data) {
        this.socket.emit('message', data);
    }

    newMessageReceived() {
        const observable = new Observable<{user_id: String, user: String, message: String}>(observer => {
            this.socket.on('nova mensagem', (data) => {
                observer.next(data);
            });
            return () => { this.socket.disconnect(); }
        });

        return observable;
    }

    searchFilteredMessages(room, body) {
        return this._http.post<any>(environment.API_URL + '/chat/retornarMensagensFiltradas', body , {
            observe: 'body',
            params: new HttpParams().append('ID_sala', room)
        });
    }
}
