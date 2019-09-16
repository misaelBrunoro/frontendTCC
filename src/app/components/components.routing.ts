import { DetalhesPerguntaComponent } from './detalhes-pergunta/detalhes-pergunta.component';
import { Routes } from '@angular/router';

export const ComponentsRoutes: Routes = [
    { path: 'detalhes/:id',      component:  DetalhesPerguntaComponent},
];
