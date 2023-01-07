import{
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Injectable
} from '@nestjs/common';
import { UsersService } from '../users.service';

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
  constructor(
    private usersService:UsersService
  ){}

  async intercept(ctx:ExecutionContext, handler: CallHandler){
    const request = ctx.switchToHttp().getRequest();
    const { userEmail } = request.session || {} ;

    if(userEmail){
      const user = await this.usersService.findEmail(userEmail);
      request.currentUser = user;
    }
    return handler.handle(); //run the actual handler
  }
}
