import { Injectable } from '@nestjs/common';
import { User } from './entity/user/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUser } from './dto/create-user/create-user';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findUserById(userId: string): Promise<User> {
    return this.userRepository.findOne({ where: { id: userId } });
  }

  async createUser(userDto: CreateUser): Promise<User> {
    return this.userRepository.save(userDto);
  }
}