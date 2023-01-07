import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Schema as MongooseSchema } from "mongoose";

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User{
  _id:MongooseSchema.Types.ObjectId;

  @Prop({ required:true })
  email:string

  @Prop({required: true})
  password:string;
}

export const UserSchema = SchemaFactory.createForClass(User);
