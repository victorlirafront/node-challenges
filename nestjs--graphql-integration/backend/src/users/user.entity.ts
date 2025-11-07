import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { Wine } from '../wines/wine.entity';
import { Review } from '../reviews/review.entity';

@ObjectType()
@Entity()
export class User {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Field(() => [Wine], { nullable: true })
  @ManyToMany(() => Wine, { cascade: true })
  @JoinTable()
  favorites?: Wine[];

  @Field(() => [Review], { nullable: true })
  @OneToMany(() => Review, review => review.user)
  reviews?: Review[];
}
