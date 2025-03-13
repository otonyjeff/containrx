import { NextFunction, Request, Response } from "express";
import { JwtPayload, verify } from "jsonwebtoken";

export class Middlewares {
  tokenVerifier = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader) {
        res.json({
          err: "authorization token was not provided",
          isSuccess: false,
        });
        return;
      }

      const token = authHeader!.split(" ")[1];
      
      req.user = verify(
        token,
        process.env.SECRET_KEY!
      ) as JwtPayload;

      next();
    } catch (err) {
      res.json({ isSuccess: false, err });
    }
  };
}
