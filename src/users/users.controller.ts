import { Controller, Get, Post, Patch } from '@nestjs/common';

@Controller('users')
export class UsersController {

  //List Users
  @Get()
  getListUsers(){
    return {"message": "Returns the list of users"}
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
