import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { WinesService } from './wines.service';
import { Wine } from './wine.entity';
import { CreateWineInput } from './dto/create-wine.dto';

@Resolver(() => Wine)
export class WinesResolver {
  constructor(private readonly winesService: WinesService) {}

  @Mutation(() => Wine)
  createWine(@Args('createWineInput') createWineInput: CreateWineInput) {
    return this.winesService.create(createWineInput);
  }

  @Query(() => [Wine], { name: 'wines' })
  findAll(@Args('filter', { nullable: true }) filter?: string) {
    return this.winesService.findAll(filter);
  }

  @Query(() => Wine, { name: 'wine' })
  findOne(@Args('id', { type: () => ID }) id: number) {
    return this.winesService.findOne(id);
  }
}
