import { Test, TestingModule } from '@nestjs/testing';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';
import { Repository } from 'typeorm';
import { Item } from './entities/item.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('ItemsController', () => {
  let controller: ItemsController;
  let itemsRepository: Repository<Item>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItemsController],
      providers: [
        ItemsService,
        {
          provide: getRepositoryToken(Item),
          useClass: Repository,
        },
      ],
    }).compile();

    controller = module.get<ItemsController>(ItemsController);
    itemsRepository = module.get<Repository<Item>>(getRepositoryToken(Item));
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
