
import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { PerfilUserComponent } from '../../pages/perfil-user/perfil-user.component';
import { MuralComponent } from '../../pages/mural/mural.component';
import { AdminComponent } from '../../pages/admin/admin.component';
import { ChatComponent } from '../../pages/chat/chat.component';
import { PerguntaNovaComponent } from 'app/components/pergunta/pergunta-nova/pergunta-nova.component';
import { DetalhesPerguntaComponent } from './../../components/pergunta/detalhes-pergunta/detalhes-pergunta.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'graficos',                    component: DashboardComponent },
    { path: 'perfil-user',                 component: PerfilUserComponent },
    { path: 'mural',                       component: MuralComponent },
    { path: 'mural/nova-pergunta',         component: PerguntaNovaComponent},
    { path: 'mural/detalhe-pergunta/:id',  component: DetalhesPerguntaComponent},
    { path: 'chat',                        component: ChatComponent },
    { path: 'admin',                       component: AdminComponent },
];
