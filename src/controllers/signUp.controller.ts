import { Request, Response } from "express";
import { signUpService } from "../services";

export const signUpController = async (req: Request, res: Response) => {
  const { email, password, confirmPassword } = req.body;

  const result = await signUpService(email, password, confirmPassword)

  

  res.json({});
};
