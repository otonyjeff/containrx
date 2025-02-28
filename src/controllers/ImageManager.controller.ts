import { Request, Response } from "express";
import { ImageManagerService } from "../services";

export class ImageManagerController {
  private imageManageService: ImageManagerService;

  constructor() {
    this.imageManageService = new ImageManagerService();
  }

  async listImages(req: Request, res: Response) {
    const { err, data } = await this.imageManageService.listImages();

    if (err) res.status(err.statusCode).json({ err: err.message });
    else res.json(data);
  }

  async removeImage(req: Request, res: Response) {
    const { err, data } = await this.imageManageService.removeImage(
      req.params.name
    );

    if (err) res.status(err.statusCode).json({ err: err.message });
    else res.json(data);
  }
}
