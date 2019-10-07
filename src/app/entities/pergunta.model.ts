import { Resposta } from './resposta.model';
import { Usuario } from './usuario.model';
import { Disciplina } from './disciplina.model';

export class Pergunta {
    _id: string;
    titulo: string;
    descricao: string;
    resolvido: boolean;
    usuario: Usuario;
    createdAt: Date;
    disciplina: Disciplina;
    resposta: Resposta[];
}
