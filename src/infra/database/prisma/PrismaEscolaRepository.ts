import { prisma } from '../../../config/prisma'; // Ou o caminho para o seu singleton do prisma
import { IEscolaRepository, CriarEscolaDTO } from '../../../domain/repositories/IEscolaRepository';

export class PrismaEscolaRepository implements IEscolaRepository {
  async buscarPorEmailAdmin(email: string) {
    return await prisma.usuario.findUnique({
      where: { email },
    });
  }

  async criarComAdmin(dados: CriarEscolaDTO) {
    // Procura ou cria o perfil ADMINISTRADOR
    let perfilAdmin = await prisma.perfil.findUnique({
      where: { nome: 'ADMINISTRADOR' },
    });

    if (!perfilAdmin) {
      perfilAdmin = await prisma.perfil.create({
        data: { nome: 'ADMINISTRADOR' },
      });
    }

    // Cria a Escola e o Usuário Admin numa única transação
    return await prisma.escola.create({
      data: {
        nome: dados.nomeEscola,
        cnpj: dados.cnpj,
        usuarios: {
          create: {
            nome: dados.nomeAdmin,
            email: dados.emailAdmin,
            senhaHash: dados.senhaAdmin,
            perfilId: perfilAdmin.id,
          },
        },
      },
      include: {
        usuarios: true,
      },
    });
  }
}