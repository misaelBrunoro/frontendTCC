import { UserService } from './../../services/user/user.service';
import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
    tipo: any[];
}
export const ROUTES: RouteInfo[] = [
    { path: '/graficos', title: 'Gráficos',  icon: 'trending_up', class: '', tipo: ['Admin', 'Monitor', 'Professor', 'Aluno'] },
    { path: '/perfil-user', title: 'Perfil de Usuário',  icon: 'person', class: '', tipo: ['Admin', 'Monitor', 'Professor', 'Aluno'] },
    { path: '/mural', title: 'Mural de Perguntas',  icon: 'content_paste', class: '', tipo: ['Admin', 'Monitor', 'Professor', 'Aluno'] },
    { path: '/chat', title: 'Chat',  icon: 'speaker_notes', class: '', tipo: ['Admin', 'Monitor', 'Professor', 'Aluno'] },
    { path: '/admin', title: 'Admin',  icon: 'build', class: '', tipo: ['Admin'] },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  currentUser: any;

  constructor(
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.userService.currentUser().then(data => {
      this.currentUser = data;
    });
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
