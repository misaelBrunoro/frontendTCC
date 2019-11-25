import { Observable } from 'rxjs';
import { PerguntaService } from 'app/services/pergunta/pergunta.service';
import { UserService } from './../../services/user/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  currentUser: any;

  constructor(
    private userService: UserService,
    private perguntaService: PerguntaService,
  ) { }

  ngOnInit() {
    this.userService.currentUser().then(res => {
      this.currentUser = res;
    });

    // this.perguntaService.retornarDados().subscribe(res => {
     //   console.log(res, "Dados");
    // });
  }

}
