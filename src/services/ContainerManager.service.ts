import { ContainerCreationProps, ServiceResponse } from "../../types";
import { dockerApi } from "../configs";
import { ErrorWithStatusCode } from "../utils";

export class ContainerManagerService {
  listContainers = async (): Promise<ServiceResponse> => {
    try {
      const containers = await dockerApi.listContainers({ all: true });

      return { data: { containers }, err: null };
    } catch (err) {
      return {
        data: null,
        err: new ErrorWithStatusCode(`Internal server error, ${err}`, 500),
      };
    }
  };

  createContainer = async (
    containerCreationProps: ContainerCreationProps
  ): Promise<ServiceResponse> => {
    try {
      const container = await dockerApi.createContainer(containerCreationProps);

      await container.start();

      return { data: { message: "Container created successfully" }, err: null };
    } catch (err) {
      return {
        data: null,
        err: new ErrorWithStatusCode(`Internal server error, ${err}`, 500),
      };
    }
  };

  pauseContainer = async (containerId: string): Promise<ServiceResponse> => {
    try {
      const container = dockerApi.getContainer(containerId);
      await container.pause();
      return {
        data: containerId,
        err: null,
      };
    } catch (err) {
      return {
        data: null,
        err: new ErrorWithStatusCode(`Internal server error, ${err}`, 500),
      };
    }
  };

  unpauseContainer = async (containerId: string): Promise<ServiceResponse> => {
    try {
      const container = dockerApi.getContainer(containerId);
      await container.unpause();
      return {
        data: containerId,
        err: null,
      };
    } catch (err) {
      return {
        data: null,
        err: new ErrorWithStatusCode(`Internal server error, ${err}`, 500),
      };
    }
  };

  stopContainer = async (containerId: string): Promise<ServiceResponse> => {
    try {
      const container = dockerApi.getContainer(containerId);
      await container.stop();
      return {
        data: containerId,
        err: null,
      };
    } catch (err) {
      return {
        data: null,
        err: new ErrorWithStatusCode(`Internal server error, ${err}`, 500),
      };
    }
  };

  resumeContainer = async (containerId: string): Promise<ServiceResponse> => {
    try {
      const container = dockerApi.getContainer(containerId);
      await container.start();
      return {
        data: containerId,
        err: null,
      };
    } catch (err) {
      return {
        data: null,
        err: new ErrorWithStatusCode(`Internal server error, ${err}`, 500),
      };
    }
  };

  removeContainer = async (containerId: string): Promise<ServiceResponse> => {
    try {
      const container = dockerApi.getContainer(containerId);
      await container.remove({ force: true });
      return {
        data: containerId,
        err: null,
      };
    } catch (err) {
      return {
        data: null,
        err: new ErrorWithStatusCode(`Internal server error, ${err}`, 500),
      };
    }
  };

} 
