import { Response } from "express";
import { ErrorWithStatusCode } from "../utils";

export abstract class BaseController {
  protected handleResponse(
    res: Response,
    err: ErrorWithStatusCode | null,
    data: Object | null
  ) {
    if (err) res.status(err.statusCode).json({ err: err.message });
    else res.json(data);
  }
}
