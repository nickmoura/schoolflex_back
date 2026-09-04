import { Router } from 'express';
import { EscolaController } from '../controllers/EscolaController';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { checkRole } from '../middlewares/checkRole';

const escolaRoutes = Router();
const escolaController = new EscolaController();
escolaRoutes.post('/', (req, res) => escolaController.handle(req, res));

escolaRoutes.get(
  '/dashboard-admin',
  ensureAuthenticated,
  checkRole(['ADMINISTRADOR']),
  (req, res) => {
    return res.json({
      message: 'Bem-vindo ao painel administrativo!',
      usuarioLogado: req.user,
    });
  }
);

escolaRoutes.get(
  '/',
  ensureAuthenticated,
  checkRole(['ADMINISTRADOR']),
  (req, res) => escolaController.listar(req, res)
);

export { escolaRoutes };