import { Controller, Get, Post, Patch } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './schemas/user.schema';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService
  ){}

  //List Users
  @Get()
  getListUsers(){
    return this.usersService.findAll();
  }

  //Creates a user (ex.signup)
  @Post()
  createUser(){
    return {"message": "Creates a user, normally from signup"}
  }

  //Updates a user
  @Patch(':id')
  updateUser(){
    return {"message": "Updates user data"}
  }

}
