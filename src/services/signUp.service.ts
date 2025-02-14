import { UserModel } from "../models"
import { ErrorWithStatusCode } from "../utils/error.util"

export const signUpService = async (email: string, password: string, confirmPassword: string) => {

    // const userExists = await UserModel.findOne({ email })

    // if (userExists) {
        const err =  new ErrorWithStatusCode("User with given email already exists", 409)
    // }

}