import { JwtPayload } from "jsonwebtoken";
import { ErrorWithStatusCode } from "./src/utils";
import Dockerode, { HostConfig } from "dockerode";

interface ServiceResponse {
  err: ErrorWithStatusCode | null;
  data: Object | null;
}

interface ContainerCreationProps {
  Image: string;
  name?: string;
  HostConfig?: HostConfig;
  ExposedPorts?: Dockerode.ContainerCreateOptions.ExposedPorts;
  Env?: string[];
}

declare global {
  namespace Express {
    interface Request {
      user: JwtPayload;
    }
  }
}
