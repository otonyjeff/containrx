import { Request, Response } from "express";
import { ImageManagerService } from "../services";
import { BaseController } from "./Base.controller";

export class ImageManagerController extends BaseController {
  private readonly imageManageService: ImageManagerService;

  constructor() {
    super();
    this.imageManageService = new ImageManagerService();
  }

  pullImage = async (req: Request, res: Response) => {
    this.handleResponse(
      res,
      await this.imageManageService.pullImage(req.params.name)
    );
  };

  listImages = async (_: Request, res: Response) => {
    this.handleResponse(res, await this.imageManageService.listImages());
  };

  removeImage = async (req: Request, res: Response) => {
    this.handleResponse(
      res,
      await this.imageManageService.removeImage(req.params.name)
    );
  };
}
