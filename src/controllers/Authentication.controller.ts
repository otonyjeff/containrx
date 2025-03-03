import { Request, Response } from "express";
import { AuthenticationService } from "../services";
import { BaseController } from "./Base.controller";

export class AuthenticationController extends BaseController {
  private authenticationService: AuthenticationService;

  constructor() {
    super();
    this.authenticationService = new AuthenticationService();
  }

  async signUp(req: Request, res: Response) {
    const { email, password, confirmPassword } = req.body;

    const { err, data } = await this.authenticationService.signUp(
      email,
      password,
      confirmPassword
    );

    this.handleResponse(res, err, data);
  }

  async signIn(req: Request, res: Response) {
    const { email, password } = req.body;

    const { err, data } = await this.authenticationService.signIn(
      email,
      password
    );

    this.handleResponse(res, err, data);
  }
}
