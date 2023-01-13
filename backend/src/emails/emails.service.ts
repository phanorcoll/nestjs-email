import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Email, EmailDocument } from './schemas/email.schema';
import { Model } from 'mongoose';
import { User } from '../users/schemas/user.schema';

@Injectable()
export class EmailsService {
  constructor(
    @InjectModel(Email.name) private emailModel: Model<EmailDocument>
  ){}

  async create(user:User, email:Email): Promise<Email> {
    return this.emailModel.create(email);
  }

  async getListEmailsPerUser(email:string): Promise<Email[]> {
    const emails = await this.emailModel.find({to:email}).exec();
    if(emails.length === 0) {
      throw new NotFoundException('user has no emails')
    }

    return emails;
  }

  async getEmailData(id:string): Promise<Email> {
    const email = this.emailModel.findById(id);
    if(!email){
      throw new NotFoundException('no email found')
    }

    return email
  }

  async update(id:string, attrs: Partial<Email>): Promise<Email>{
    const email = this.emailModel.findByIdAndUpdate(id, attrs, { new: true });
    return email;
  }

}
