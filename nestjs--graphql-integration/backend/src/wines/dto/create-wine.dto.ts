import { InputType, Field, Int } from '@nestjs/graphql';
import { IsString, IsNumber, IsOptional } from 'class-validator';

@InputType()
export class CreateWineInput {
  @Field()
  @IsString()
  name: string;

  @Field()
  @IsString()
  type: string;

  @Field()
  @IsString()
  country: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  grape?: string;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsNumber()
  year?: number;
}
