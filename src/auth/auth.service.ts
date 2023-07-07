import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';

import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(authCredentialsDto: any): Promise<User> {
    return this.userRepository.createUser(authCredentialsDto);
  }

  async signIn(authCredentialsDto: any): Promise<{ accessToken: string }> {
    try {
      const user = await this.userRepository.signIn(authCredentialsDto);

      const payload: JwtPayload = { username: user.username };

      const accessToken: string = await this.jwtService.sign(payload);

      return { accessToken };
    } catch (error) {
      console.log(error);
    }
  }
}
