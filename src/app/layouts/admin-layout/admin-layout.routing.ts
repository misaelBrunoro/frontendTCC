import { ProfessorComponent } from './../../pages/professor/professor.component';

import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { PerfilUserComponent } from '../../pages/perfil-user/perfil-user.component';
import { MuralComponent } from '../../pages/mural/mural.component';
import { AdminComponent } from '../../pages/admin/admin.component';
import { ChatComponent } from '../../pages/chat/chat.component';
import { PerguntaNovaComponent } from 'app/components/pergunta/pergunta-nova/pergunta-nova.component';
import { DetalhesPerguntaComponent } from './../../components/pergunta/detalhes-pergunta/detalhes-pergunta.component';
import { ListarRespostasComponent } from './../../components/resposta/listar-respostas/listar-respostas.component';
import { AuthGuard } from '../../guards/auth.guard';

export const AdminLayoutRoutes: Routes = [
    {
        path: '',
        canActivate: [AuthGuard],
        redirectTo: 'dashboard'
    },
    {
        path: 'dashboard',
        canActivate: [AuthGuard],
        component: DashboardComponent
    },
    {
        path: 'perfil-user',
        canActivate: [AuthGuard],
        component: PerfilUserComponent 
    },
    {
        path: 'mural',
        canActivate: [AuthGuard],
        component: MuralComponent
    },
    {
        path: 'mural/nova-pergunta',
        canActivate: [AuthGuard],
        component: PerguntaNovaComponent
    },
    {
        path: 'mural/detalhe-pergunta/:id',
        canActivate: [AuthGuard],
        component: DetalhesPerguntaComponent
    },
    {
        path: 'mural/detalhe-pergunta/respostas/:id',
        canActivate: [AuthGuard],
        component: ListarRespostasComponent
    },
    {
        path: 'chat',
        canActivate: [AuthGuard],
        component: ChatComponent
    },
    {
        path: 'admin',
        canActivate: [AuthGuard],
        component: AdminComponent,
        data: {tipo: 'Admin'}
    },
    {
        path: 'professor',
        canActivate: [AuthGuard],
        component: ProfessorComponent,
        data: {tipo: 'Professor'}
    },
];
