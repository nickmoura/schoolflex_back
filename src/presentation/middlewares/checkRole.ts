import { Request, Response, NextFunction } from 'express';

export function checkRole(rolesPermitidas: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRole = req.user?.role;

    if (!userRole || !rolesPermitidas.includes(userRole)) {
      return res.status(403).json({
        error: 'Acesso negado: Perfil sem permissão para esta operação.',
      });
    }

    return next();
  };
}