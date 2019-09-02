export class Pergunta {
    titulo: string;
    descricao: string;
    anexo: string;
    resolvido: boolean;
    userId: string;
    dataPublicacao: Date;
    disciplina: string;
    key: string;

    getData(): object {
        const result = {};
        Object.keys(this).map(key => result[key] = this[key]);
        return result;
    }
}
