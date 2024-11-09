import { Body, Controller, Post, NotFoundException, BadRequestException } from "@nestjs/common";
import { AuthService } from '../services/auth.services';


@Controller('/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async Login(@Body() body: any) {
    try {
      const auth: any = this.authService.generateToken(body);
      return auth;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Failed to retrieve item');
    }
  }
}