import { describe, it, expect, vi } from 'vitest';
import { checkRole } from './checkRole';

describe('checkRole Middleware', () => {
  it('deve permitir acesso se a role do usuário estiver autorizada', () => {
    const middleware = checkRole(['ADMINISTRADOR']);

    const req = { user: { role: 'ADMINISTRADOR' } } as any;
    const res = {} as any;
    const next = vi.fn();

    middleware(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  it('deve retornar status 403 se o usuário não tiver a role permitida', () => {
    const middleware = checkRole(['ADMINISTRADOR']);

    const req = { user: { role: 'ALUNO' } } as any;
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    } as any;
    const next = vi.fn();

    middleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(next).not.toHaveBeenCalled();
  });
});