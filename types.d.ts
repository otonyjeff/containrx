import { ErrorWithStatusCode } from "./src/utils";

interface ServiceResponse {
  err: ErrorWithStatusCode | null;
  data: Object | null;
}

interface AuthServiceResponse extends ServiceResponse {
  data: { token: string } | null
}
