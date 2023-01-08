import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users.service';
import { User } from '../schemas/user.schema';

describe('AuthService', () => {
  let service: AuthService;
  let fakeUsersService: Partial<UsersService>;

  beforeEach(async () => {

    const users: User[] = [];
    fakeUsersService = {
      create: (user:User): Promise<User> => {
        users.push(user);
        return Promise.resolve(user);
      },
      findEmail: (email:string) => {
        const filteredUsers = users.filter(user => user.email === email);
        return Promise.resolve(filteredUsers);
      },
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: fakeUsersService
        }
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('creates a new user with a salted and hashed password', async ()=>{
    const testUser: Partial<User> = {
      "email": "hello@gmail.com",
      "password": "1234"
    }
    const user = await service.signup(testUser.email, testUser.password);
    expect(user.password).not.toEqual('1234');
    const [salt,hash] = user.password.split('.');
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  })

  it('throws an error if signup email is in use', async () =>{
    const testUser: Partial<User> = {
      "email": "hello@gmail.com",
      "password": "1234"
    }

    await service.signup(testUser.email, testUser.password);
    await expect(service.signup(testUser.email, testUser.password)).rejects.toThrow(
      BadRequestException
    )
  })

  it('thows error if signin with unused email', async () =>{
    const testUser: Partial<User> = {
      "email": "hello@gmail.com",
      "password": "1234"
    }
    await expect(service.signin(testUser.email, testUser.password)).rejects.toThrow(
      NotFoundException
    );
  })

  it('throws error is invalid password is used', async ()=>{
    const testUser: Partial<User> = {
      "email": "hello@gmail.com",
      "password": "1234"
    }
    await service.signup(testUser.email, testUser.password);
    await expect(service.signin(testUser.email,'wrong')).rejects.toThrow(
      BadRequestException
    );
  })

  it('returns user if credentials are valid', async () =>{
    const testUser: Partial<User> = {
      "email": "hello@gmail.com",
      "password": "1234"
    }
    await service.signup(testUser.email,testUser.password);
    const user = await service.signin(testUser.email, testUser.password);
    expect(user).toBeDefined();

  })

});
