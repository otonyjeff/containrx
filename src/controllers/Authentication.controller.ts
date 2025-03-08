import { Request, Response } from "express";
import { AuthenticationService } from "../services";
import { BaseController } from "./Base.controller";

export class AuthenticationController extends BaseController {
  private authenticationService: AuthenticationService;

  constructor() {
    super();
    this.authenticationService = new AuthenticationService();
  }

  signUp = async (req: Request, res: Response) => {
    const { email, password, confirmPassword } = req.body;
    this.handleResponse(
      res,
      await this.authenticationService.signUp(email, password, confirmPassword)
    );
  };

  signIn = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    this.handleResponse(
      res,
      await this.authenticationService.signIn(email, password)
    );
  };
}
