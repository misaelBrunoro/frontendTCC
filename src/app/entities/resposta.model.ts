import { Usuario } from './usuario.model';

export class Resposta {
    _id: string;
    oficial: boolean;
    descricao: string;
    resolvido: boolean;
    usuario: Usuario;
    createdAt: Date;
}
