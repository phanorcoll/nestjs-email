import { 
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  NotFoundException,
  Session,
  UseInterceptors,
  UseGuards
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './schemas/user.schema';
import { AuthService } from './auth/auth.service';
import { CurrentUser } from './decorators/current-user.decorator'; import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';
import { AuthGuard } from '../guards/auth.guard';


@Controller('users')
@UseInterceptors(CurrentUserInterceptor)
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService
  ){}


  //Creates a user (ex.signup)
  @Post('/signup')
  async createUser(@Body() data:User, @Session() session: any){
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
  @UseGuards(AuthGuard)
  whoAmI(@CurrentUser() user:User){
    // return this.usersService.findEmail(session.userEmail);
    return user;
  }

  //List Users
  @Get('/list')
  @UseGuards(AuthGuard)
  getListUsers(){
    return this.usersService.findAll();
  }

  //Gets a particular user
  @Get('/get')
  @UseGuards(AuthGuard)
  async getUser(@CurrentUser() user:User) {
    const {_id} = user[0];
    console.log(_id)
    const userFound = await this.usersService.findOne(_id);
    console.log(userFound)
    if(!userFound){
      throw new NotFoundException('user not found');
    }
    return userFound;
  }

  //Updates a user
  @Patch()
  @UseGuards(AuthGuard)
  updateUser(@CurrentUser() user:User, @Body() body:User){
    const {_id} = user[0];
    return this.usersService.update(_id, body);
  }

}
