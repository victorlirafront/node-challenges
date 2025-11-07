import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { User } from './user.entity';
import { Wine } from '../wines/wine.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Wine])],
  providers: [UsersService, UsersResolver],
  exports: [UsersService],
})
export class UsersModule {}
