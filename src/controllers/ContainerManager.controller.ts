import { Request, Response } from "express";
import { ContainerManagerService } from "../services/ContainerManager.service";
import { BaseController } from "./Base.controller";

export class ContainerManagerController extends BaseController {
  private readonly containerManagerService: ContainerManagerService;

  constructor() {
    super();
    this.containerManagerService = new ContainerManagerService();
  }

  listContainers = async (_: Request, res: Response) => {
    this.handleResponse(
      res,
      await this.containerManagerService.listContainers()
    );
  };

  createContainer = async (req: Request, res: Response) => {
    const PortBindings = req.body.portMappings.reduce(
      (
        acc: { [x: string]: {}[] },
        curr: { containerPort: any; hostPort: any }
      ) => {
        acc[`${curr.containerPort}/tcp`] = [{ HostPort: curr.hostPort }];
        return acc;
      },
      {}
    );

    const ExposedPorts = req.body.portMappings.reduce(
      (
        acc: { [x: string]: {} },
        curr: { containerPort: any; hostPort: any }
      ) => {
        acc[`${curr.containerPort}/tcp`] = {};
        return acc;
      },
      {}
    );

    this.handleResponse(
      res,
      await this.containerManagerService.createContainer({
        Image: `${req.body.imageName}:${req.body.imageTag}`,
        name: req.body.name,
        HostConfig: { PortBindings },
        ExposedPorts,
      })
    );
  };
}
