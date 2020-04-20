import { DisciplinaService } from './../../services/disciplina/disciplina.service';
import { UserService } from './../../services/user/user.service';
import { ChatService } from './../../services/chat/chat.service';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

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
  @ViewChild('chatDiv', {static: false}) public chatDiv: ElementRef;

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
    this.messageArray = [];
    if (this.currentUser) {
      this.chatService.joinRoom({user_id: this.currentUser._id, user: this.currentUser.nomeVirtual, room: this.room});

      this.chatService.searchMessages(this.room).subscribe(res => {
        res.forEach(element => {
          this.messageArray.push({user_id: element.usuario._id, user: element.usuario.nomeVirtual, message: element.mensagem});
        });
        this.scrollToBottom();
      });
    }
  }

  leave() {
    this.messageArray = [];
    if (this.currentUser) {
      this.chatService.leaveRoom({user_id: this.currentUser._id, user: this.currentUser.nomeVirtual, room: this.room});
    }
  }

  sendMessage() {
    if (this.currentUser && this.messageText !== '') {
      this.chatService.sendMessage({user_id: this.currentUser._id, user: this.currentUser.nomeVirtual,
                                    room: this.room, message: this.messageText});
    }
    this.messageText = '';
    this.scrollToBottom();
  }

  scrollToBottom() {
    setTimeout(() => { this.chatDiv.nativeElement.scrollTop = this.chatDiv.nativeElement.scrollHeight; }, 3)
  }
}
