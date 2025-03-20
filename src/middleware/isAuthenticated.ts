import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "segreto_super_sicuro";

interface AuthenticatedRequest extends Request {
  user?: { id: number; isAdmin: boolean };
}

export const authMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ message: "Token non fornito" });
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: number; isAdmin: boolean };
    req.user = { id: decoded.userId, isAdmin: decoded.isAdmin };
    next();
  } catch (error) {
     res.status(401).json({ message: "Token non valido" });
    return;
  }
};
