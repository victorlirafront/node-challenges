import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { WinesModule } from './wines/wines.module';
import { ReviewsModule } from './reviews/reviews.module';
import { User } from './users/user.entity';
import { Wine } from './wines/wine.entity';
import { Review } from './reviews/review.entity';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      sortSchema: true,
      csrfPrevention: false,
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'winebook.db',
      entities: [User, Wine, Review],
      synchronize: true,
    }),
    UsersModule,
    WinesModule,
    ReviewsModule,
  ],
})
export class AppModule {}
