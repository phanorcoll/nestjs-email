import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Email, EmailDocument } from './schemas/email.schema';
import { Model } from 'mongoose';

@Injectable()
export class EmailsService {
  constructor(
    @InjectModel(Email.name) private emailModel: Model<EmailDocument>
  ){}

  async create(email:Email): Promise<Email> {
    console.log(email.to)
    return this.emailModel.create(email);
  }

  async getListEmailsPerUser(email:string): Promise<Email[]> {
    const emails = await this.emailModel.find({"to":email});
    if(emails.length === 0) {
      throw new NotFoundException('no user found')
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
    console.log(email);
    return email;
  }

}
