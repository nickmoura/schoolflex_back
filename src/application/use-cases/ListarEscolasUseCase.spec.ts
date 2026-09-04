import { describe, it, expect, beforeEach } from 'vitest';
import { ListarEscolasUseCase } from './ListaEscolaUseCase';
import { InMemoryEscolaRepository } from '../../tests/InMemoryEscolaRepository';

describe('ListarEscolasUseCase', () => {
  let escolaRepository: InMemoryEscolaRepository;
  let sut: ListarEscolasUseCase; // System Under Test

  beforeEach(() => {
    escolaRepository = new InMemoryEscolaRepository();
    sut = new ListarEscolasUseCase(escolaRepository);

    // Pré-popula o repositório em memória com escolas de teste
    escolaRepository.escolas.push(
      { id: '1', nome: 'Escola Alfa', cnpj: '11111111000111', ativo: true, createdAt: new Date() },
      { id: '2', nome: 'Escola Beta', cnpj: '22222222000122', ativo: true, createdAt: new Date() },
      { id: '3', nome: 'Colégio Gama', cnpj: '33333333000133', ativo: true, createdAt: new Date() }
    );
  });

  it('deve ser possível listar escolas paginadas', async () => {
    const resultado = await sut.execute({ page: 1, limit: 2 });

    expect(resultado.escolas).toHaveLength(2);
    expect(resultado.total).toBe(3);
    expect(resultado.totalPages).toBe(2);
  });

  it('deve filtrar escolas por nome ou CNPJ', async () => {
    const resultado = await sut.execute({ search: 'Alfa' });

    expect(resultado.escolas).toHaveLength(1);
    expect(resultado.escolas[0].nome).toBe('Escola Alfa');
  });
});