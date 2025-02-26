import { ServiceResponse } from "../../../types";
import { dockerApi } from "../../configs";
import { ErrorWithStatusCode } from "../../utils";

export const listImagesService = async (): Promise<ServiceResponse> => {
  try {
    const images = await dockerApi.listImages({ all: true });
    return { err: null, data: { images } };
  } catch (err) {
    return {
      err: new ErrorWithStatusCode(`Internal server error, ${err}`, 500),
      data: null,
    };
  }
};
