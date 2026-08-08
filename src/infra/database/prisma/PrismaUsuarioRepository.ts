import { prisma } from '../../../config/prisma';
import { IUsuarioRepository, UsuarioComRelacoess } from '../../../domain/repositories/IUsuarioRepository';

export class PrismaUsuarioRepository implements IUsuarioRepository {
  async buscarPorEmail(email: string): Promise<UsuarioComRelacoess | null> {
    const usuario = await prisma.usuario.findUnique({
      where: { email },
      include: {
        perfil: true,
        escola: true,
      },
    });

    return usuario;
  }
}