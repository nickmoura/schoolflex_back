import { Router } from 'express';
import { AutenticacaoController } from '../controllers/AutenticacaoController';

const authRoutes = Router();
const autenticacaoController = new AutenticacaoController();

authRoutes.post('/login', (req, res) => autenticacaoController.login(req, res));

export { authRoutes };