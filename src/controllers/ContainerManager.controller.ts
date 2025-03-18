import { Request, Response } from "express";
import { ContainerManagerService } from "../services/ContainerManager.service";
import { BaseController } from "./Base.controller";

export class ContainerManagerController extends BaseController {
  private readonly containerManagerService: ContainerManagerService;

  constructor() {
    super();
    this.containerManagerService = new ContainerManagerService();
  }

  createContainer = async (req: Request, res: Response) => {
    this.handleResponse(
      res,
      await this.containerManagerService.createContainer(req.body)
    );
  };
}
