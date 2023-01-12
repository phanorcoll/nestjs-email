import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { EmailsModule } from './emails/emails.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://root:example@0.0.0.0:27017',
      {
        dbName: 'vertrical'
      }
    ),
    UsersModule,
    EmailsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
