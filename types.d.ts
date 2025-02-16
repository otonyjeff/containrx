import { ErrorWithStatusCode } from "./src/utils";

interface AuthServiceResponse {
  err: ErrorWithStatusCode | null;
  data: { token: string } | null;
}
