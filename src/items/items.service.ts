import { Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Item } from './entities/item.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private itemsRepository: Repository<Item>,
  ) {}

  findAll(): Promise<Item[]> {
    return this.itemsRepository.find();
  }

  findOne(id: number): Promise<Item | null> {
    return this.itemsRepository.findOneBy({ id });
  }

  async create(createItemDto: CreateItemDto): Promise<void> {
    await this.itemsRepository.insert(createItemDto);
  }

  async update(id: number, updateItemDto: UpdateItemDto): Promise<void> {
    await this.itemsRepository.update(+id, updateItemDto);
  }

  async remove(id: number): Promise<void> {
    await this.itemsRepository.delete(+id);
  }
}
