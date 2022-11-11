import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  getUsers(): Promise<any> {
    console.log('getUsers');
    return this.usersRepository.find();
  }

  async getUser(_id: number): Promise<User[]> {
    return await this.usersRepository.find({
      select: ['fullName', 'birthday', 'isActive'],
      where: [{ id: _id }],
    });
  }

  async updateUser(id: number, user: User) {
    await this.usersRepository.save(user);
    return { user };
  }

  async createUser(user: User) {
    console.log('hello');
    if (user) {
      await this.usersRepository.save(user);
      return this.usersRepository.create({
        id: user.id,
        fullName: user.fullName,
        birthday: user.birthday,
        isActive: user.isActive,
      });
    }
    return 'user is not created';
  }
  async deleteUser(user: User) {
    this.usersRepository.delete(user);
  }
}
