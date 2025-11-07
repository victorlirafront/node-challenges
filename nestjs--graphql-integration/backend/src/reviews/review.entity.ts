import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from '../users/user.entity';
import { Wine } from '../wines/wine.entity';

@ObjectType()
@Entity()
export class Review {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => User)
  @ManyToOne(() => User, user => user.reviews)
  user: User;

  @Field(() => Wine)
  @ManyToOne(() => Wine, wine => wine.reviews)
  wine: Wine;

  @Field()
  @Column()
  rating: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  comment?: string;

  @Field()
  @CreateDateColumn()
  createdAt: Date;
}
