import { 
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  NotFoundException,
  Session
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './schemas/user.schema';
import { AuthService } from './auth/auth.service';

@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService
  ){}

  //List Users
  @Get()
  getListUsers(){
    return this.usersService.findAll();
  }

  //Creates a user (ex.signup)
  @Post('/signup')
  async reateUser(@Body() data:User, @Session() session: any){
    const user = await this.authService.signup(data.email,data.password);
    console.log(user);
    session.userEmail = user.email;

    return user;
  }

  @Post('/signin')
  async signin(@Body() data:User, @Session() session: any){
    const user = await this.authService.signin(data.email,data.password);
    session.userEmail = user.email;

    return user;
  }

  @Post('/signout')
  sighOut(@Session() session:any) {
    session.userEmail = null;
  }

  @Get('/whoami')
  whoAmI(@Session() session:any){
    return this.usersService.findEmail(session.userEmail);
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
