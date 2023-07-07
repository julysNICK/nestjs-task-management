import { Repository } from 'typeorm';
import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

import * as bcrypt from 'bcrypt';

export class UserRepository extends Repository<User> {
  async createUser(AuthCredentialsDto: AuthCredentialsDto): Promise<User> {
    const { username, password } = AuthCredentialsDto;

    const salt = await bcrypt.genSalt();

    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.create({
      username,
      password: hashedPassword,
    });

    try {
      await this.save(user);
      return user;
    } catch (error) {
      console.log(error);
      if (error.code === '23505') {
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async signIn(AuthCredentialsDto: AuthCredentialsDto): Promise<User> {
    const { username, password } = AuthCredentialsDto;

    const user = await this.findOne({
      where: { username },
    });

    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    } else {
      return null;
    }
  }
}
