import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';

export type EmailDocument = HydratedDocument<Email>;

@Schema()
export class Email{
  _id:MongooseSchema.Types.ObjectId;
  
  @Prop({required: true})
  to:string;

  @Prop()
  from:string;

  @Prop({default: Date.now})
  receivedDate:Date;

  @Prop({default: false})
  read:boolean;

  @Prop({default: false})
  deleted:boolean;

  @Prop({default: false})
  draft:boolean;

  @Prop()
  subjet:string;

  @Prop({default: false})
  body:string;

}

export const EmailSchema = SchemaFactory.createForClass(Email);
