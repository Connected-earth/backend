import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signIn(username: string, pass: string) {
    const user = await this.usersService.findOne(username);

    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }

    // Use bcrypt https://github.com/kelektiv/node.bcrypt.js#readme
    // for storing the password safely and checking the hashed password
    const { password, ...result } = user;
    // TODO: return a JWT and return it here
    // instead of the user object
    return result;
  }
}
