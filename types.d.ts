import { ErrorWithStatusCode } from "./src/utils";

declare global {

  interface SignUpServiceResponse {
    err: ErrorWithStatusCode | null;
    data: { userId: string } | null;
  }

}
