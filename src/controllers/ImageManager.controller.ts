import { Request, Response } from "express";
import { ImageManagerService } from "../services";
import { BaseController } from "./Base.controller";

export class ImageManagerController extends BaseController {
  private readonly imageManagerService: ImageManagerService;

  constructor() {
    super();
    this.imageManagerService = new ImageManagerService();
  }

  pullImage = async (req: Request, res: Response) => {
    this.handleResponse(
      res,
      await this.imageManagerService.pullImage(req.params.name)
    );
  };

  listImages = async (_: Request, res: Response) => {
    this.handleResponse(res, await this.imageManagerService.listImages());
  };

  removeImage = async (req: Request, res: Response) => {
    this.handleResponse(
      res,
      await this.imageManagerService.removeImage(req.params.name)
    );
  };
}
