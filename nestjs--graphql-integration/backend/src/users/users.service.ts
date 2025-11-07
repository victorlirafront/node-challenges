import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';
import { CreateUserInput } from './dto/create-user.dto';
import { Wine } from '../wines/wine.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Wine)
    private winesRepository: Repository<Wine>,
  ) {}

  async create(createUserInput: CreateUserInput): Promise<User> {
    const hashedPassword = await bcrypt.hash(createUserInput.password, 10);
    const user = this.usersRepository.create({
      ...createUserInput,
      password: hashedPassword,
    });
    return this.usersRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find({ relations: ['favorites', 'reviews'] });
  }

  async findOne(id: number): Promise<User> {
    return this.usersRepository.findOne({
      where: { id },
      relations: ['favorites', 'reviews'],
    });
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async toggleFavorite(userId: number, wineId: number): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      relations: ['favorites'],
    });
    const wine = await this.winesRepository.findOne({
      where: { id: wineId },
    });

    if (!user || !wine) {
      throw new Error('User or Wine not found');
    }

    const isFavorite = user.favorites?.some((fav) => fav.id === wine.id);
    
    if (isFavorite) {
      user.favorites = user.favorites.filter((fav) => fav.id !== wine.id);
    } else {
      user.favorites = [...(user.favorites || []), wine];
    }

    return this.usersRepository.save(user);
  }
}
