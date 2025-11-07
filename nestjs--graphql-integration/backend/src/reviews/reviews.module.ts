import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewsService } from './reviews.service';
import { ReviewsResolver } from './reviews.resolver';
import { Review } from './review.entity';
import { User } from '../users/user.entity';
import { Wine } from '../wines/wine.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Review, User, Wine])],
  providers: [ReviewsService, ReviewsResolver],
  exports: [ReviewsService],
})
export class ReviewsModule {}
