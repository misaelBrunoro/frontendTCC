import { ChatService } from './../../services/chat/chat.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-realtime-chat',
  templateUrl: './realtime-chat.component.html',
  styleUrls: ['./realtime-chat.component.scss'],
  providers: [ChatService]
})
export class RealtimeChatComponent implements OnInit {
  user: String;
  room: String;
  messageText: String;
  messageArray: Array<{user: String, message: String}> = [];

  constructor(private chatService: ChatService) { }

  ngOnInit() {
  }

  join() {
  }

  leave() {
  }

  sendMessage() {
  }
}
