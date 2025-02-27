import { ServiceResponse } from "../../../types";
import { dockerApi } from "../../configs";
import { ErrorWithStatusCode } from "../../utils";

export const removeImageService = async (
  name: string
): Promise<ServiceResponse> => {
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
};
