declare namespace Express {
  export interface Request {
    user?: {
      role: string;
      id: string;
      token: string;
    };
  }
}
