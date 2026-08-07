import bcrypt from 'bcrypt';
import { IEscolaRepository, CriarEscolaDTO } from '../../domain/repositories/IEscolaRepository';

export class CadastrarEscolaUseCase {
  constructor(private escolaRepository: IEscolaRepository) {}

  async execute(dados: CriarEscolaDTO) {
    const usuarioExiste = await this.escolaRepository.buscarPorEmailAdmin(dados.emailAdmin);

    if (usuarioExiste) {
      throw new Error('E-mail já cadastrado no sistema.');
    }

    const senhaHash = await bcrypt.hash(dados.senhaAdmin, 10);

    const escolaCriada = await this.escolaRepository.criarComAdmin({
      ...dados,
      senhaAdmin: senhaHash,
    });

    return escolaCriada;
  }
}