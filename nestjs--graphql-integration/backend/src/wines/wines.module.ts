import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WinesService } from './wines.service';
import { WinesResolver } from './wines.resolver';
import { Wine } from './wine.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Wine])],
  providers: [WinesService, WinesResolver],
  exports: [WinesService],
})
export class WinesModule {}
