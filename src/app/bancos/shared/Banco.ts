import { Estado } from 'src/app/estados/shared/estado';

export class Banco {
    codigo?: number = null;
    nome: string = '';
    agencia: string = '';
    endereco: Endereco = new Endereco();
}

export class Endereco {
    logradouro?: string = '';
    bairro?: string = '';
    cidade: string = '';
    cep?: string = '';
    estado: Estado = new Estado();
}