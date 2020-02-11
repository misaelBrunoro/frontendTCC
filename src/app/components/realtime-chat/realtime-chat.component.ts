import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-realtime-chat',
  templateUrl: './realtime-chat.component.html',
  styleUrls: ['./realtime-chat.component.scss']
})
export class RealtimeChatComponent implements OnInit {
  user: String;
  room: String;
  messageText: String;
  messageArray: Array<{user: String, message: String}> = [];

  constructor() { }

  ngOnInit() {
  }

  join() {
  }

  leave() {
  }

  sendMessage() {
  }
}
