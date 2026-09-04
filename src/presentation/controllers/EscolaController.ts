import { Request, Response } from 'express';
import { CadastrarEscolaUseCase } from '../../application/use-cases/CadastrarEscolaUseCase';
import { ListarEscolasUseCase } from '../../application/use-cases/ListaEscolaUseCase';
import { PrismaEscolaRepository } from '../../infra/database/prisma/PrismaEscolaRepository';

export class EscolaController {
  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const { nomeEscola, cnpj, nomeAdmin, emailAdmin, senhaAdmin } = req.body;

      const prismaEscolaRepository = new PrismaEscolaRepository();
      const cadastrarEscolaUseCase = new CadastrarEscolaUseCase(prismaEscolaRepository);

      const resultado = await cadastrarEscolaUseCase.execute({
        nomeEscola,
        cnpj,
        nomeAdmin,
        emailAdmin,
        senhaAdmin,
      });

      return res.status(201).json(resultado);
    } catch (error: any) {
      return res.status(400).json({ error: error.message || 'Erro inesperado.' });
    }
  }

  async listar(req: Request, res: Response): Promise<Response> {
    try {
      const { page, limit, search } = req.query;

      const escolaRepository = new PrismaEscolaRepository();
      const listarEscolasUseCase = new ListarEscolasUseCase(escolaRepository);

      const resultado = await listarEscolasUseCase.execute({
        page: page ? Number(page) : undefined,
        limit: limit ? Number(limit) : undefined,
        search: search ? String(search) : undefined,
      });

      return res.status(200).json(resultado);
    } catch (error: any) {
      return res.status(400).json({
        message: error.message || 'Erro ao listar escolas.',
      });
    }
  }
}