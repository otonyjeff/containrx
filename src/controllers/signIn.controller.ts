import { Request, Response } from "express";
import { signInService } from "../services";

export const signInController = async (req: Request, res: Response) => {

  const { email, password } = req.body

  const { err, data } = await signInService(email, password);

  if (err) res.status(err.statusCode).json({ err: err.message });
  
  else res.json(data);
};
