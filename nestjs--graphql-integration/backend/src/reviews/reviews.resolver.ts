import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { ReviewsService } from './reviews.service';
import { Review } from './review.entity';
import { CreateReviewInput } from './dto/create-review.dto';

@Resolver(() => Review)
export class ReviewsResolver {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Mutation(() => Review)
  async createReview(@Args('createReviewInput') createReviewInput: CreateReviewInput) {
    return this.reviewsService.create(createReviewInput);
  }

  @Query(() => [Review], { name: 'reviews' })
  findAll() {
    return this.reviewsService.findAll();
  }

  @Query(() => Review, { name: 'review' })
  findOne(@Args('id', { type: () => ID }) id: number) {
    return this.reviewsService.findOne(id);
  }
}
