import { UserModel } from "../models";
import { ErrorWithStatusCode } from "../utils";

export const signUpService = async (
  email: string,
  password: string,
  confirmPassword: string
): Promise<SignUpServiceResponse> => {
  if (await UserModel.findOne({ email }))
    return {
      err: new ErrorWithStatusCode("User with given email already exists", 409),
      data: null,
    };

  if (password !== confirmPassword)
    return {
      err: new ErrorWithStatusCode("Passwords mismatch", 400),
      data: null,
    };

  const createdUser = await UserModel.create({ email, password });

  return { err: null, data: { userId: createdUser._id.toString() } };
};
