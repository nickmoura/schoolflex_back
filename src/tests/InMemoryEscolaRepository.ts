import { IEscolaRepository, CriarEscolaDTO } from '../../domain/repositories/IEscolaRepository';

export class InMemoryEscolaRepository implements IEscolaRepository {
  public escolas: any[] = [];
  public usuarios: any[] = [];

  async buscarPorEmailAdmin(email: string) {
    const usuario = this.usuarios.find((u) => u.email === email);
    return usuario || null;
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