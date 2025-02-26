import { sign } from "jsonwebtoken";
import { AuthServiceResponse } from "../../../types";
import { UserModel } from "../../models";
import { ErrorWithStatusCode } from "../../utils";

export const signInService = async (
  email: string,
  password: string
): Promise<AuthServiceResponse> => {
  if (!email || !password)
    return {
      err: new ErrorWithStatusCode("Invalid credentials", 400),
      data: null,
    };

  const userExists = await UserModel.findOne({ email });

  if (!userExists)
    return {
      err: new ErrorWithStatusCode("User with given email does not exist", 401),
      data: null,
    };

  const token = sign(
    { userId: userExists._id.toString() },
    process.env.SECRET_KEY!
  );

  return {
    err: null,
    data: { token },
  };
};
