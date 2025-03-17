import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";


export const verifyUser = (req: Request, res: Response, next: NextFunction) => {
  try {
    const tokenExist = req.headers["authorization"];
    if (!tokenExist) {
      res.status(401).json({ message: "No token provided" });
      return;
    }

    const token = tokenExist.split(" ")[1]; 
    if (!token) {
      res.status(401).json({ message: "Invalid token format" });
      return;
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { role: string; id: string };

    req.user = {
      role: decoded.role,
      id: decoded.id,
      token: token,
    };

    next();
  } catch (error) {
    console.error("JWT Verification Error:", error);
  }
};
