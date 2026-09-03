import { describe, it, expect, beforeEach } from 'vitest';
import { CadastrarEscolaUseCase } from './CadastrarEscolaUseCase';
import { InMemoryEscolaRepository } from '../../tests/InMemoryEscolaRepository';

describe('CadastrarEscolaUseCase', () => {
  let escolaRepository: InMemoryEscolaRepository;
  let sut: CadastrarEscolaUseCase;

  beforeEach(() => {
    escolaRepository = new InMemoryEscolaRepository();
    sut = new CadastrarEscolaUseCase(escolaRepository);
  });

  it('deve ser possível cadastrar uma nova escola com administrador', async () => {
    const resultado = await sut.execute({
      nome: 'Escola Modelo',
      cnpj: '12345678000195',
      adminNome: 'Diretor Silva',
      adminEmail: 'diretor@escola.com',
      senhaAdmin: 'senhaSegura123',
    });

    expect(resultado).toHaveProperty('escola');
    expect(escolaRepository.escolas).toHaveLength(1);
    expect(escolaRepository.escolas[0].nome).toBe('Escola Modelo');
  });
});