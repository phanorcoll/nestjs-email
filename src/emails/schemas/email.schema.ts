import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type EmailDocument = HydratedDocument<Email>;

@Schema()
export class Email{
  @Prop({required: true})
  to:string;

  @Prop({required: true})
  from:string;

  @Prop({default: Date.now})
  receivedDate:Date;

  @Prop({default: false})
  read:boolean;

  @Prop({default: false})
  deleted:boolean;

  @Prop({default: false})
  draft:boolean;

  @Prop({default: false})
  body:string;

}

export const EmailSchema = SchemaFactory.createForClass(Email);
