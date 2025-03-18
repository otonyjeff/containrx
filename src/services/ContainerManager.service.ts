import { ContainerCreationProps, ServiceResponse } from "../../types";
import { dockerApi } from "../configs";
import { ErrorWithStatusCode } from "../utils";

export class ContainerManagerService {
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
}
