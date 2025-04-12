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

  pauseContainer = async (req: Request, res: Response) => {
    this.handleResponse(
      res,
      await this.containerManagerService.pauseContainer(req.body.containerId)
    );
  };

  unpauseContainer = async (req: Request, res: Response) => {
    this.handleResponse(
      res,
      await this.containerManagerService.unpauseContainer(req.body.containerId)
    );
  };

  stopContainer = async (req: Request, res: Response) => {
    this.handleResponse(
      res,
      await this.containerManagerService.stopContainer(req.body.containerId)
    );
  };

  resumeContainer = async (req: Request, res: Response) => {
    this.handleResponse(
      res,
      await this.containerManagerService.resumeContainer(req.body.containerId)
    );
  };

  removeContainer = async (req: Request, res: Response) => {
    this.handleResponse(
      res,
      await this.containerManagerService.removeContainer(req.body.containerId)
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

    const envs = (req.body.env as { key: string; value: string }[]).map(
      ({ key, value }) => {
        return `${key}=${value}`;
      }
    );

    this.handleResponse(
      res,
      await this.containerManagerService.createContainer({
        Image: `${req.body.imageName}:${req.body.imageTag}`,
        name: req.body.name,
        HostConfig: { PortBindings, NetworkMode: "containrx-network" },
        ExposedPorts,
        Env: envs.length > 0 ? envs : undefined,
      })
    );
  };
}
