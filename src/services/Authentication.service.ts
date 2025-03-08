import { genSalt, hash } from "bcrypt";
import { UserModel } from "../models";
import { ErrorWithStatusCode } from "../utils";
import { sign } from "jsonwebtoken";
import { AuthServiceResponse, ServiceResponse } from "../../types";

export class AuthenticationService {
  signUp = async (
    email: string,
    password: string,
    confirmPassword: string
  ): Promise<ServiceResponse> => {
    if (!email || !password || !confirmPassword)
      return {
        err: new ErrorWithStatusCode("Invalid credentials", 400),
        data: null,
      };

    if (await UserModel.findOne({ email }))
      return {
        err: new ErrorWithStatusCode(
          "User with given email already exists",
          409
        ),
        data: null,
      };

    if (password !== confirmPassword)
      return {
        err: new ErrorWithStatusCode("Passwords mismatch", 400),
        data: null,
      };

    const salt = await genSalt(12);

    const hashedPassword = await hash(password, salt);

    const { email: registeredEmail, _id } = await UserModel.create({
      email,
      password: hashedPassword,
    });

    return { err: null, data: { _id, email: registeredEmail } };
  };

  signIn = async (
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
        err: new ErrorWithStatusCode(
          "User with given email does not exist",
          401
        ),
        data: null,
      };

    const token = sign(
      { userId: userExists._id.toString(), email: userExists.email },
      process.env.SECRET_KEY!
    );

    return {
      err: null,
      data: { token },
    };
  };
}
