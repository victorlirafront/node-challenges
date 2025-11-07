import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Review } from '../reviews/review.entity';

@ObjectType()
@Entity()
export class Wine {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  type: string;

  @Field()
  @Column()
  country: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  grape?: string;

  @Field(() => Int, { nullable: true })
  @Column({ nullable: true })
  year?: number;

  @Field(() => [Review], { nullable: true })
  @OneToMany(() => Review, review => review.wine)
  reviews?: Review[];
}
