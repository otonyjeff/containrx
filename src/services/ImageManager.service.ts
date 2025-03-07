import { ServiceResponse } from "../../types";
import { dockerApi } from "../configs";
import { ErrorWithStatusCode } from "../utils";

export class ImageManagerService {
  async pullImage(imageName: string): Promise<ServiceResponse> {
    try {
      await dockerApi.pull(imageName);
      return {
        err: null,
        data: { message: "image pulled" },
      };
    } catch (err) {
      return {
        err: new ErrorWithStatusCode(`Internal server error, ${err}`, 500),
        data: null,
      };
    }
  }

  async listImages(): Promise<ServiceResponse> {
    try {
      const images = await dockerApi.listImages({ all: true });
      return { err: null, data: { images } };
    } catch (err) {
      return {
        err: new ErrorWithStatusCode(`Internal server error, ${err}`, 500),
        data: null,
      };
    }
  }

  async removeImage(name: string): Promise<ServiceResponse> {
    try {
      await dockerApi.getImage(name).remove();

      return {
        err: null,
        data: { imageId: name },
      };
    } catch (err) {
      return {
        err: new ErrorWithStatusCode(`Internal server error, ${err}`, 500),
        data: null,
      };
    }
  }
}
