import { DisciplinaService } from './../../services/disciplina/disciplina.service';
import { UserService } from './../../services/user/user.service';
import { ChatService } from './../../services/chat/chat.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-realtime-chat',
  templateUrl: './realtime-chat.component.html',
  styleUrls: ['./realtime-chat.component.scss'],
  providers: [ChatService]
})
export class RealtimeChatComponent implements OnInit {
  currentUser: any;
  room: String;
  messageText: String;
  messageArray: Array<{user_id: String, user: String, message: String}> = [];
  disciplinas = [];

  constructor(
    private chatService: ChatService,
    private userService: UserService,
    private disciplinaService: DisciplinaService
  ) {
    this.chatService.newUserJoined().subscribe(data => {
      this.messageArray.push(data);
    });

    this.chatService.userLeftRoom().subscribe(data => {
      this.messageArray.push(data);
    });

    this.chatService.newMessageReceived().subscribe(data => {
      this.messageArray.push(data);
    });

    this.disciplinaService.getList().subscribe(data => {
      this.disciplinas = data;
    });
  }

  ngOnInit() {
    this.userService.currentUser().then(res => {
      this.currentUser = res;
    });
  }

  join() {
    if (this.currentUser) {
      this.chatService.joinRoom({user_id: this.currentUser._id, user: this.currentUser.nomeVirtual, room: this.room});
    }
  }

  leave() {
    if (this.currentUser) {
      this.chatService.leaveRoom({user_id: this.currentUser._id, user: this.currentUser.nomeVirtual, room: this.room});
    }
    this.messageArray = [];
  }

  sendMessage() {
    if (this.currentUser) {
      this.chatService.sendMessage({user_id: this.currentUser._id, user: this.currentUser.nomeVirtual,
                                    room: this.room, message: this.messageText});
    }
    this.messageText = '';
  }
}
