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