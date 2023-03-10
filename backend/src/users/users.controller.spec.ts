import mongoose from 'mongoose';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthService} from './auth/auth.service';
import { User } from './schemas/user.schema';

describe('UsersController', () => {
  let controller: UsersController;
  let fakeUsersService: Partial<UsersService>;
  let fakeAuthService: Partial<AuthService>;
  

  beforeEach(async () => {
    const users: User[] = [];
    fakeUsersService = {
      findAll: () => {
        return Promise.resolve(
          [
            {email:'hello@test.com', password: '1234'} as User
          ]
        );
      },
      // update: () => {}
    };
    fakeAuthService = {
      signup: (email:string, password:string) => {
        return Promise.resolve({
          email,
          password
        } as User)
      },
      signin: (email:string, password:string) => {
        return Promise.resolve({
          email,
          password
        } as User)
      }
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: fakeUsersService
        },
        {
          provide: AuthService,
          useValue: fakeAuthService
        }
      ]
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('getListUsers() returns the list of users', async () =>{
    const users = await controller.getListUsers();
    expect(users.length).toEqual(1);
    expect(users[0].email).toEqual('hello@test.com');
  })

  it('getListUsers() returns NotFoundException', async () =>{
    fakeUsersService.findAll=() => {return Promise.resolve(null);}
    const users = controller.getListUsers();
    await expect(users).rejects.toThrow(
      NotFoundException
    )
  })

  it('createUser() and returns a user and session property', async ()=>{
    const session = {userEmail: ''}
    const user = await controller.createUser(
      {
        email: 'testing@nestjs.com',
        password: 'asdf'
      } as User,
      session
    );

    expect(user.email).toEqual('testing@nestjs.com');
    expect(session.userEmail).toEqual('testing@nestjs.com');
  })

  it('signin() and returns a user and session property', async ()=>{
    const session = {userEmail: ''}
    const user = await controller.signin(
      {
        email: 'testing@nestjs.com',
        password: 'asdf'
      } as User,
      session
    );

    expect(user.email).toEqual('testing@nestjs.com');
    expect(session.userEmail).toEqual('testing@nestjs.com');
  })


});
