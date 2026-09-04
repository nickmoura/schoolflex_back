import { IEscolaRepository, CriarEscolaDTO } from '../../domain/repositories/IEscolaRepository';

export class InMemoryEscolaRepository implements IEscolaRepository {
  public escolas: any[] = [];
  public usuarios: any[] = [];

  async buscarPorEmailAdmin(email: string) {
    const usuario = this.usuarios.find((u) => u.email === email);
    return usuario || null;
  }

  async listar({ page = 1, limit = 10, search }: ListarEscolasParams): Promise<ListarEscolasResultado> {
    let escolasFiltradas = this.escolas;

    // Aplica o filtro de busca se enviado
    if (search) {
      const termo = search.toLowerCase();
      escolasFiltradas = this.escolas.filter(
        (escola) =>
          escola.nome.toLowerCase().includes(termo) ||
          escola.cnpj.includes(termo)
      );
    }

    // Aplica a paginação simulada em memória
    const total = escolasFiltradas.length;
    const startIndex = (page - 1) * limit;
    const paginadas = escolasFiltradas.slice(startIndex, startIndex + limit);
    const totalPages = Math.ceil(total / limit);

    return {
      escolas: paginadas,
      total,
      page,
      totalPages,
    };
  }

  async criarComAdmin(dados: CriarEscolaDTO) {
    const novaEscola = {
      id: 'escola-1',
      nome: dados.nome,
      cnpj: dados.cnpj,
      createdAt: new Date(),
    };

    const novoUsuario = {
      id: 'user-1',
      nome: dados.adminNome,
      email: dados.adminEmail,
      senhaHash: dados.adminSenha,
      escolaId: novaEscola.id,
      perfilId: 1,
    };

    this.escolas.push(novaEscola);
    this.usuarios.push(novoUsuario);

    return { escola: novaEscola, usuario: novoUsuario };
  }
}