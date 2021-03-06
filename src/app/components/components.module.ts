import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FooterComponent} from './footer/footer.component';
import {NavbarComponent} from './navbar/navbar.component';
import {SidebarComponent} from './sidebar/sidebar.component';
import {PerguntaNovaComponent} from '.././components/pergunta/pergunta-nova/pergunta-nova.component';
import {ListarPerguntasComponent} from '.././components/pergunta/listar-perguntas/listar-perguntas.component';
import {DetalhesPerguntaComponent} from '.././components/pergunta/detalhes-pergunta/detalhes-pergunta.component';
import {FiltrosComponent} from '.././components/filtros/filtros.component';
import {MaterialFormatModule} from '../material/material-format.module';
import {ListarRespostasComponent} from './resposta/listar-respostas/listar-respostas.component';
import {RespostaNovaComponent} from './resposta/resposta-nova/resposta-nova.component';
import {ComentarioComponent} from './comentario/comentario.component';
import {ConfirmDialogComponent} from './confirm-dialog/confirm-dialog.component';
import {VincularDisciplinasComponent} from './disciplinas/vincular-disciplinas/vincular-disciplinas.component';
import {ListarProfessoresComponent} from './listar-professores/listar-professores.component';
import {ListarDisciplinasComponent} from './disciplinas/listar-disciplinas/listar-disciplinas.component';
import {PerguntasSimilaresComponent} from './pergunta/perguntas-similares/perguntas-similares.component';
import {RealtimeChatComponent} from './realtime-chat/realtime-chat.component';
import { EditorComponent } from './editor/editor.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        MaterialFormatModule
    ],
    declarations: [
        NavbarComponent,
        SidebarComponent,
        FiltrosComponent,
        PerguntaNovaComponent,
        ListarPerguntasComponent,
        DetalhesPerguntaComponent,
        FiltrosComponent,
        ListarRespostasComponent,
        RespostaNovaComponent,
        ComentarioComponent,
        ConfirmDialogComponent,
        VincularDisciplinasComponent,
        ListarProfessoresComponent,
        ListarDisciplinasComponent,
        PerguntasSimilaresComponent,
        RealtimeChatComponent,
        EditorComponent,
    ],
    exports: [
        NavbarComponent,
        SidebarComponent,
        FiltrosComponent,
        PerguntaNovaComponent,
        ListarPerguntasComponent,
        DetalhesPerguntaComponent,
        FiltrosComponent,
        ListarRespostasComponent,
        RespostaNovaComponent,
        ComentarioComponent,
        ConfirmDialogComponent,
        VincularDisciplinasComponent,
        ListarProfessoresComponent,
        ListarDisciplinasComponent,
        RealtimeChatComponent,
        EditorComponent,
    ],
    providers: [
        MaterialFormatModule
    ],
    entryComponents: [
        RespostaNovaComponent,
        ConfirmDialogComponent,
        VincularDisciplinasComponent,
        PerguntasSimilaresComponent
    ]
})
export class ComponentsModule {
}
