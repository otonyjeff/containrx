import { Request, Response } from "express";
import { ImageManagerService } from "../services";
import { BaseController } from "./Base.controller";

export class ImageManagerController extends BaseController {
  private imageManageService: ImageManagerService;

  constructor() {
    super();
    this.imageManageService = new ImageManagerService();
  }

  async listImages(_: Request, res: Response) {
    const { err, data } = await this.imageManageService.listImages();
    this.handleResponse(res, err, data);
  }

  async removeImage(req: Request, res: Response) {
    const { err, data } = await this.imageManageService.removeImage(
      req.params.name
    );

    this.handleResponse(res, err, data);
  }
}
