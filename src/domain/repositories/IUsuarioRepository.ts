import { Usuario, Perfil, Escola } from '@prisma/client';

export type UsuarioComRelacoess = Usuario & {
  perfil: Perfil;
  escola: Escola;
};

export interface IUsuarioRepository {
  buscarPorEmail(email: string): Promise<UsuarioComRelacoess | null>;
}