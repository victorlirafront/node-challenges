import { InputType, Field, Int } from '@nestjs/graphql';
import { IsNumber, IsString, IsOptional, Min, Max } from 'class-validator';

@InputType()
export class CreateReviewInput {
  @Field(() => Int)
  @IsNumber()
  userId: number;

  @Field(() => Int)
  @IsNumber()
  wineId: number;

  @Field()
  @IsNumber()
  @Min(1)
  @Max(5)
  rating: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  comment?: string;
}
