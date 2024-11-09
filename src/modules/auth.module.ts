import { Module } from '@nestjs/common';
import { UserModule } from './users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from 'src/services/auth.services';
import { JwtStrategy } from 'src/utils/jwt.strategy';
import { AuthController } from 'src/controllers/auth.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthRepository } from 'src/repositories/auth.repository';
import { DatabaseModule } from './database.module';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    ConfigModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: configService.get<string>('JWT_EXPIRES_IN') || '1h' },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, AuthRepository],
  exports: [AuthService],
})
export class AuthModule {}