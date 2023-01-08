import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>
  ){}

  async create(user:User): Promise<User>{
    return this.userModel.create(user);
  }

  async findOne(id:string): Promise<User> {
    return this.userModel.findById(id);
  }


  async findAll(): Promise<User[]> {
    return this.userModel.find();
  }

  async findEmail(email:string): Promise<User[]> {
    return this.userModel.find({email});
  }

  async update(id:string, attrs: Partial<User>) {
    return this.userModel.findByIdAndUpdate(id, attrs, { new: true });
  }
}
