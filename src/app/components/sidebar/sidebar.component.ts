import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/graficos', title: 'Gráficos',  icon: 'trending_up', class: '' },
    { path: '/perfil-user', title: 'Perfil de Usuário',  icon: 'person', class: '' },
    { path: '/mural', title: 'Mural de Perguntas',  icon: 'content_paste', class: '' },
    { path: '/chat', title: 'Chat',  icon: 'speaker_notes', class: '' },
    { path: '/admin', title: 'Admin',  icon: 'build', class: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
