import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Wine } from './wine.entity';
import { CreateWineInput } from './dto/create-wine.dto';

@Injectable()
export class WinesService {
  constructor(
    @InjectRepository(Wine)
    private winesRepository: Repository<Wine>,
  ) {}

  create(createWineInput: CreateWineInput): Promise<Wine> {
    const wine = this.winesRepository.create(createWineInput);
    return this.winesRepository.save(wine);
  }

  findAll(filter?: string): Promise<Wine[]> {
    if (filter) {
      return this.winesRepository.find({
        where: [
          { name: filter },
          { country: filter },
          { type: filter },
        ],
        relations: ['reviews'],
      });
    }
    return this.winesRepository.find({ relations: ['reviews'] });
  }

  findOne(id: number): Promise<Wine> {
    return this.winesRepository.findOne({
      where: { id },
      relations: ['reviews'],
    });
  }
}
