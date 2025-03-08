import { JwtPayload } from "jsonwebtoken";
import { ErrorWithStatusCode } from "./src/utils";

interface ServiceResponse {
  err: ErrorWithStatusCode | null;
  data: Object | null;
}

interface AuthServiceResponse extends ServiceResponse {
  data: { token: string } | null
}

declare global {
  namespace Express {
    interface Request {
      user: JwtPayload;
    }
  }
}
