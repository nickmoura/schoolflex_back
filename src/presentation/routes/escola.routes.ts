import { Router } from 'express';
import { EscolaController } from '../controllers/EscolaController';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { checkRole } from '../middlewares/checkRole';

const escolaRoutes = Router();

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

const escolaController = new EscolaController();

escolaRoutes.post('/escolas', (req, res) => escolaController.handle(req, res));

export { escolaRoutes };