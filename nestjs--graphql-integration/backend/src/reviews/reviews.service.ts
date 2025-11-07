import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './review.entity';
import { CreateReviewInput } from './dto/create-review.dto';
import { User } from '../users/user.entity';
import { Wine } from '../wines/wine.entity';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private reviewsRepository: Repository<Review>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Wine)
    private winesRepository: Repository<Wine>,
  ) {}

  async create(createReviewInput: CreateReviewInput): Promise<Review> {
    const user = await this.usersRepository.findOne({
      where: { id: createReviewInput.userId },
    });
    const wine = await this.winesRepository.findOne({
      where: { id: createReviewInput.wineId },
    });

    if (!user || !wine) {
      throw new Error('User or Wine not found');
    }

    const review = this.reviewsRepository.create({
      ...createReviewInput,
      user,
      wine,
    });

    return this.reviewsRepository.save(review);
  }

  findAll(): Promise<Review[]> {
    return this.reviewsRepository.find({
      relations: ['user', 'wine'],
    });
  }

  findOne(id: number): Promise<Review> {
    return this.reviewsRepository.findOne({
      where: { id },
      relations: ['user', 'wine'],
    });
  }
}
