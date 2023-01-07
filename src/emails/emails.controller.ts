import { 
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Body,
} from '@nestjs/common';
import { EmailsService } from './emails.service';
import { Email } from './schemas/email.schema';

@Controller('emails')
export class EmailsController {
  constructor(
    private readonly emailsService: EmailsService
  ){}

  //Find a particular email
  @Get(':id')
  getEmail(@Param('id') id:string) {
    return this.emailsService.getEmailData(id);
  }

  //List emails for a particular user 
  //The key for the user will be held in a session cookie
  @Get('/list/:email')
  getListEmails(@Param('email') email:string){
    return this.emailsService.getListEmailsPerUser(email)
  }

  //Creates an emaill (ex.receiving an email)
  @Post()
  createEmail(@Body() data:Email){
    return this.emailsService.create(data);
  }

  //Updates an email, this could be a change of:
  // readStatus, deletedStatus, draftStatus
  // it will search for user's email and pull
  @Patch(':id')
  updateEmail(@Param('id') id:string, @Body() body:Email){
    return this.emailsService.update(id, body);
  }


}
