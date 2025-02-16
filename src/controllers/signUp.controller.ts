import { Request, Response } from "express";
import { signUpService } from "../services";

export const signUpController = async (req: Request, res: Response) => {
  const { email, password, confirmPassword } = req.body;

  const { err, data } = await signUpService(email, password, confirmPassword);

  if (err) res.status(err.statusCode).json({ err: err.message });
  
  else res.json(data);
};
