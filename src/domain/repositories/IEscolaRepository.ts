export interface CriarEscolaDTO {
  nomeEscola: string;
  cnpj?: string;
  nomeAdmin: string;
  emailAdmin: string;
  senhaAdmin: string;
}

export interface IEscolaRepository {
  criarComAdmin(dados: CriarEscolaDTO): Promise<any>;
  buscarPorEmailAdmin(email: string): Promise<any>;
}

export interface ListarEscolasParams {
  page?: number;
  limit?: number;
  search?: string;
}

export interface ListarEscolasResultado {
  escolas: Array<{
    id: string;
    nome: string;
    cnpj: string;
    ativo: boolean;
    createdAt: Date;
  }>;
  total: number;
  page: number;
  totalPages: number;
}

export interface IEscolaRepository {
  // ...outros métodos existentes (ex: buscarPorEmailAdmin, criarComAdmin)
  listar(params: ListarEscolasParams): Promise<ListarEscolasResultado>;
}