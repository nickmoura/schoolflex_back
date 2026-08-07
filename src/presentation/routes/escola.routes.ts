import { Router } from 'express';
import { EscolaController } from '../controllers/EscolaController';

const escolaRoutes = Router();
const escolaController = new EscolaController();

escolaRoutes.post('/escolas', (req, res) => escolaController.handle(req, res));

export { escolaRoutes };