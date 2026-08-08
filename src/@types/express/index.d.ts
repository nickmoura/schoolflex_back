declare namespace Express {
  export interface Request {
    user: {
      id: number;
      escolaId: number;
      role: string;
    };
  }
}