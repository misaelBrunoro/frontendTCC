import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { PerfilUserComponent } from '../../pages/perfil-user/perfil-user.component';
import { MuralComponent } from '../../pages/mural/mural.component';
import { AdminComponent } from '../../pages/admin/admin.component';
import { ChatComponent } from '../../pages/chat/chat.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'graficos',      component: DashboardComponent },
    { path: 'perfil-user',   component: PerfilUserComponent },
    { path: 'mural',     component: MuralComponent },
    { path: 'chat',          component: ChatComponent },
    { path: 'admin',     component: AdminComponent },
];
