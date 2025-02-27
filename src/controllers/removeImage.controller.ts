import { Request, Response } from "express";
import { removeImageService } from "../services/image/removeImage.service";

export const removeImageController = async (req: Request, res: Response) => {

    const { err, data } = await removeImageService(req.params.name)

    if (err) res.status(err.statusCode).json({ err: err.message });
    else res.json(data);

}
