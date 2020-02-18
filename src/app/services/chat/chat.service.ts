import { environment } from './../../../environments/environment';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';

@Injectable({
    providedIn: 'root'
})

export class ChatService {
    private socket;

    constructor() {
        this.socket = io(environment.FREE_URL);
    }

    joinRoom(data) {
        this.socket.emit('join', data);
    }

    newUserJoined() {
        const observable = new Observable<{user: String, message: String}>(observer => {
            this.socket.on('new user joined', (data) => {
                observer.next(data);
            });
            return () => { this.socket.disconnect(); }
        });

        return observable;
    }
}
