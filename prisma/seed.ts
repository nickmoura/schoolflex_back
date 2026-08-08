import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Semeando banco de dados com perfis e usuários de teste...');

  // 1. Criar Perfis Padrão
  const perfilAdmin = await prisma.perfil.upsert({
    where: { nome: 'ADMINISTRADOR' },
    update: {},
    create: { nome: 'ADMINISTRADOR' },
  });

  const perfilProf = await prisma.perfil.upsert({
    where: { nome: 'PROFESSOR' },
    update: {},
    create: { nome: 'PROFESSOR' },
  });

  const perfilAluno = await prisma.perfil.upsert({
    where: { nome: 'ALUNO' },
    update: {},
    create: { nome: 'ALUNO' },
  });

  console.log('✅ Perfis criados/verificados:', {
    ADMINISTRADOR: perfilAdmin.id,
    PROFESSOR: perfilProf.id,
    ALUNO: perfilAluno.id,
  });

  // 2. Garantir uma Escola para os testes
  let escola = await prisma.escola.findFirst();
  if (!escola) {
    escola = await prisma.escola.create({
      data: {
        nome: 'Escola Modelo',
        cnpj: '11222333000199',
      },
    });
  }

  // 3. Criar Usuários de Teste para Professor e Aluno
  const senhaPadraoHash = await bcrypt.hash('123456', 10);

  // Criar Professor de Teste
  const profUser = await prisma.usuario.upsert({
    where: { email: 'professor@escolamodelo.com' },
    update: {},
    create: {
      nome: 'Professor Girafales',
      email: 'professor@escolamodelo.com',
      senhaHash: senhaPadraoHash,
      escolaId: escola.id,
      perfilId: perfilProf.id,
    },
  });

  // Criar Aluno de Teste
  const alunoUser = await prisma.usuario.upsert({
    where: { email: 'aluno@escolamodelo.com' },
    update: {},
    create: {
      nome: 'Chaves do 8',
      email: 'aluno@escolamodelo.com',
      senhaHash: senhaPadraoHash,
      escolaId: escola.id,
      perfilId: perfilAluno.id,
    },
  });

  console.log('✅ Usuários de teste criados com sucesso!');
  console.log('  👉 Professor: professor@escolamodelo.com | Senha: 123456');
  console.log('  👉 Aluno: aluno@escolamodelo.com | Senha: 123456');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });