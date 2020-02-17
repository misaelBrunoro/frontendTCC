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
        this.socket = io('http://localhost:80');
    }
}