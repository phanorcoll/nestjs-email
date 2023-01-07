import { 
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  NotFoundException
} from '@nestjs/common';
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
  createUser(@Body() data:User){
    return this.usersService.create(data);
  }

  @Get(':id')
  getUser(@Param('id') id:string) {
    const user = this.usersService.findOne(id);
    if(!user){
      throw new NotFoundException('user not found');
    }
    return user;
  }

  //Updates a user
  @Patch(':id')
  updateUser(@Param('id') id:string, @Body() body:User){
    return this.usersService.update(id, body);
  }

}
