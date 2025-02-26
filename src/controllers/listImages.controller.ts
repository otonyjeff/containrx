import { Request, Response } from "express";
import { listImagesService } from "../services";

export const listImagesController = async (req: Request, res: Response) => {
  const { err, data } = await listImagesService();

  if (err) res.status(err.statusCode).json({ err: err.message });
  else res.json(data);
};
