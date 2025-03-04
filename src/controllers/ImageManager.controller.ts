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
    this.handleResponse(res, await this.imageManageService.listImages());
  }

  async removeImage(req: Request, res: Response) {
    this.handleResponse(
      res,
      await this.imageManageService.removeImage(req.params.name)
    );
  }
}
