import { prisma } from '../../../config/prisma'; // Ou o caminho para o seu singleton do prisma
import { IEscolaRepository, CriarEscolaDTO, ListarEscolasResultado, ListarEscolasParams } from '../../../domain/repositories/IEscolaRepository';

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
  async listar({ page = 1, limit = 10, search }: ListarEscolasParams): Promise<ListarEscolasResultado> {
    const skip = (page - 1) * limit;

    const where = search
      ? {
        OR: [
          { nome: { contains: search } },
          { cnpj: { contains: search } },
        ],
      }
      : {};

    const [escolas, total] = await Promise.all([
      prisma.escola.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          nome: true,
          cnpj: true,
          ativo: true,
          createdAt: true,
        },
      }),
      prisma.escola.count({ where }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      escolas,
      total,
      page,
      totalPages,
    };
  }
}