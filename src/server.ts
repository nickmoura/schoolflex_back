import express from 'express';
import cors from 'cors';
import { escolaRoutes } from './presentation/routes/escola.routes';
import { authRoutes } from './presentation/routes/auth.routes';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Servidor SchoolFlex rodando!' });
});

app.use('/escolas', escolaRoutes);
app.use('/auth', authRoutes);

const PORT = process.env.PORT || 3300;

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});