import { Request, Response } from "express";
import { AuthenticationService } from "../services";

export class AuthenticationController {
  private authenticationService: AuthenticationService;

  constructor() {
    this.authenticationService = new AuthenticationService();
  }

  async signUp(req: Request, res: Response) {
    const { email, password, confirmPassword } = req.body;

    const { err, data } = await this.authenticationService.signUp(
      email,
      password,
      confirmPassword
    );

    if (err) res.status(err.statusCode).json({ err: err.message });
    else res.json(data);
  }

  async signIn(req: Request, res: Response) {
    const { email, password } = req.body;

    const { err, data } = await this.authenticationService.signIn(
      email,
      password
    );

    if (err) res.status(err.statusCode).json({ err: err.message });
    else res.json(data);
  }
}
