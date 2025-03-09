import { compare, genSalt, hash } from "bcrypt";
import { UserModel } from "../models";
import { ErrorWithStatusCode } from "../utils";
import { sign } from "jsonwebtoken";
import { ServiceResponse } from "../../types";

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
  ): Promise<ServiceResponse> => {
    // Throwing status code 400 bad request error if credentials are missing
    if (!email || !password)
      return {
        err: new ErrorWithStatusCode("Invalid credentials", 400),
        data: null,
      };

    // Finding user with the given email
    const userExists = await UserModel.findOne({ email });

    // Throwing status code 401 unauthorized error if user is not found
    if (!userExists)
      return {
        err: new ErrorWithStatusCode("Invalid credentials", 401),
        data: null,
      };

    // Throwing status code 401 unauthorized error if user password is incorrect
    if (
      !(await compare(password.trim() as string, userExists.password as string))
    )
      return {
        err: new ErrorWithStatusCode("Invalid credentials", 401),
        data: null,
      };

    // generating token
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
