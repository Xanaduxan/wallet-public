import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDTO } from 'src/auth/dto/auth.dto';
import { LoginUserDTO } from 'src/auth/dto/login-user.dto';
import { User, UsersDocument } from 'src/schemas/users.schemas';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private usersModel: Model<UsersDocument>,
  ) {}

  async login(loginUserDTO: LoginUserDTO): Promise<User | null> {
    const existingUser = await this.usersModel.collection.findOne({
      username: loginUserDTO.username,
    });
    if (!existingUser) {
      return null;
    }
    return existingUser as User;
  }

  async registration(createUserDTO: CreateUserDTO): Promise<User | null> {
    const existingUser = await this.usersModel.collection.findOne({
      username: createUserDTO.username,
    });
    if (existingUser) {
      return null;
    }
    const createdUser = new this.usersModel(createUserDTO);
    return createdUser.save();
  }
  async findOne(username: string): Promise<User> {
    return this.usersModel.findOne({ username });
  }
}
