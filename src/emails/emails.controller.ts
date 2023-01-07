import { 
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Body,
  UseGuards
} from '@nestjs/common';
import { EmailsService } from './emails.service';
import { Email } from './schemas/email.schema';
import { AuthGuard} from '../guards/auth.guard';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { User } from '../users/schemas/user.schema';

@Controller('emails')
export class EmailsController {
  constructor(
    private emailsService: EmailsService
  ){}

  //Find a particular email
  @Get(':id')
  @UseGuards(AuthGuard)
  getEmail(@Param('id') id:string) {
    return this.emailsService.getEmailData(id);
  }

  //List emails for a particular user 
  //The key for the user will be held in a session cookie
  @Get('/get')
  @UseGuards(AuthGuard)
  getListEmails(@CurrentUser() user:User){
    const {email} = user[0]
    console.log(email)
    return this.emailsService.getListEmailsPerUser(email)
  }

  //Creates an emaill (ex.receiving an email)
  @Post()
  @UseGuards(AuthGuard)
  createEmail(@CurrentUser() user: User, @Body() data:Email){
    console.log(user)
    return this.emailsService.create(user, data);
  }

  //Updates an email, this could be a change of:
  // readStatus, deletedStatus, draftStatus
  // it will search for user's email and pull
  @Patch(':id')
  @UseGuards(AuthGuard)
  updateEmail(@Param('id') id:string, @Body() body:Email){
    return this.emailsService.update(id, body);
  }


}
