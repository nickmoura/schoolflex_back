import { Request, Response } from 'express';
import { PrismaUsuarioRepository } from '../../infra/database/prisma/PrismaUsuarioRepository';
import { AutenticarUsuarioUseCase } from '../../application/use-cases/AutenticarUsuarioUseCase';

export class AutenticacaoController {
  async login(req: Request, res: Response): Promise<Response> {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({ error: 'E-mail e senha são obrigatórios.' });
    }

    try {
      const usuarioRepository = new PrismaUsuarioRepository();
      const autenticarUseCase = new AutenticarUsuarioUseCase(usuarioRepository);

      const resultado = await autenticarUseCase.execute({ email, senha });

      return res.status(200).json(resultado);
    } catch (error: any) {
      return res.status(401).json({ error: error.message || 'Falha na autenticação.' });
    }
  }
}