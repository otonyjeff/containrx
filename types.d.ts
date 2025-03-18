import { JwtPayload } from "jsonwebtoken";
import { ErrorWithStatusCode } from "./src/utils";
import { HostConfig } from "dockerode";

interface ServiceResponse {
  err: ErrorWithStatusCode | null;
  data: Object | null;
}

interface ContainerCreationProps {
  Image: string;
  name?: string;
  Cmd?: string[];
  HostConfig?: HostConfig;
}

declare global {
  namespace Express {
    interface Request {
      user: JwtPayload;
    }
  }
}
