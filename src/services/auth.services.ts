import { Injectable, HttpException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthRepository } from '../repositories/auth.repository';
import { ResponseBuilder } from 'src/utils/response.builder';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private authRepository: AuthRepository,
  ) {}

  async generateToken(user: any) {
    const payload = { username: user.username, password: user.password };
    const dataLogin: any = await this.authRepository.auth(
      payload.username,
      payload.password,
    );
    if (!dataLogin || dataLogin.length === 0) {
      throw new HttpException(
        ResponseBuilder.error('Username atau password salah'),
        401,
      );
    } else {
      const data = {
        id: dataLogin.ID_USER,
        fullName: dataLogin.FULL_NAME,
        access_token: this.jwtService.sign(payload),
      };
      return ResponseBuilder.success(data);
    }
  }
}
