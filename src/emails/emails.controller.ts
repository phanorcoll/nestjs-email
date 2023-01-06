import { Controller, Get, Post, Patch } from '@nestjs/common';

@Controller('emails')
export class EmailsController {
  //List emails for a particular user 
  //The key for the user will be held in a session cookie
  @Get()
  getListEmails(){
    return {"message": "Returns the list of emails"}
  }

  //Creates a user (ex.receiving an email)
  @Post()
  createEmail(){
    return {"message": "Creates an email, normally from receiving"}
  }

  //Updates an email, this could be a change of:
  // readStatus, deletedStatus, draftStatus
  // it will search for user's email and pull
  @Patch(':email')
  updateUser(){
    return {"message": "Updates email data"}
  }

}
