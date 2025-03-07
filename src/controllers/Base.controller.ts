import { Response } from "express";
import { ServiceResponse } from "../../types";

export abstract class BaseController {
  protected handleResponse = (
    res: Response,
    serviceHandler: ServiceResponse
  ) => {
    const { err, data } = serviceHandler;
    if (err) res.status(err.statusCode).json({ err: err.message });
    else res.json(data);
  };
}
