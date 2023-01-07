import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { User } from '../schemas/user.schema';
import { UsersService } from '../users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);


@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService
  ){}

  async signup(email:string, password:string){
    const users = await this.usersService.findEmail(email);
    let newUser:User;
    if(users.length){
      throw new BadRequestException('email in use');
    }

    const salt = randomBytes(8).toString('hex');
    const hash = await scrypt(password, salt, 32) as Buffer;
    const result = salt+'.'+hash.toString('hex');

    newUser = {
      email,
      password:result,
    }

    const user = await this.usersService.create(newUser);

    return user;

  }

  async signin(email:string, password:string){
    const [user] = await this.usersService.findEmail(email);
    if(!user){
      throw new NotFoundException("user not found");
    }

    const [salt, storedHash] = user.password.split('.');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    if(storedHash !== hash.toString('hex')) {
      throw new BadRequestException('bad password')
    }

    return user;

  }

  signout(){}


}
