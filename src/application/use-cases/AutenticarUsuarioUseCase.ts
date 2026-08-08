import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { IUsuarioRepository } from '../../domain/repositories/IUsuarioRepository';

interface AutenticarRequest {
  email: string;
  senha: string;
}

interface AutenticarResponse {
  usuario: {
    id: number;
    nome: string;
    email: string;
    perfil: string;
    escola: {
      id: number;
      nome: string;
    };
  };
  token: string;
}

export class AutenticarUsuarioUseCase {
  constructor(private usuarioRepository: IUsuarioRepository) {}

  async execute({ email, senha }: AutenticarRequest): Promise<AutenticarResponse> {
    // 1. Buscar usuário
    const usuario = await this.usuarioRepository.buscarPorEmail(email);

    if (!usuario) {
      throw new Error('E-mail ou senha incorretos.');
    }

    // 2. Validar Senha
    const senhaBate = await bcrypt.compare(senha, usuario.senhaHash);

    if (!senhaBate) {
      throw new Error('E-mail ou senha incorretos.');
    }

    // 3. Gerar Token JWT com claims do Tenant e Perfil
    const secret = process.env.JWT_SECRET || 'fallback_secret';
    const expiresIn = process.env.JWT_EXPIRES_IN || '1d';

    const token = jwt.sign(
      {
        escola_id: usuario.escola_id,
        role: usuario.perfil.nome,
      },
      secret,
      {
        subject: String(usuario.id),
        expiresIn: expiresIn as any,
      }
    );

    return {
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        perfil: usuario.perfil.nome,
        escola: {
          id: usuario.escola.id,
          nome: usuario.escola.nome,
        },
      },
      token,
    };
  }
}