import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // 1. Criar Perfil de Admin se não existir
  const perfilAdmin = await prisma.perfil.upsert({
    where: { nome: 'ADMINISTRADOR' },
    update: {},
    create: { nome: 'ADMINISTRADOR' },
  });

  // 2. Criar Escola de Teste
  const escola = await prisma.escola.create({
    data: {
      nome: 'Escola Modelo Flex',
      cnpj: '12345678000199',
    },
  });

  // 3. Hash da Senha
  const senhaHash = await bcrypt.hash('123456', 10);

  // 4. Criar Usuário Admin associado à Escola
  const usuario = await prisma.usuario.create({
    data: {
      nome: 'Administrador Geral',
      email: 'admin@escola.com',
      senha: senhaHash,
      escola_id: escola.id,
      perfil_id: perfilAdmin.id,
    },
  });

  console.log('🌱 Banco populado com sucesso!', { escola: escola.nome, usuario: usuario.email });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });