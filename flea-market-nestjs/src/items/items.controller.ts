import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ItemsService } from './items.service';
import { Item } from './item.model';
import { ItemStatus } from './item-status.enum';

@Controller('items')
export class ItemsController {
  // DI
  constructor(private readonly itemsService: ItemsService) {}
  @Get()
  findAll(): Item[] {
    // Serviceからビジネスロジックを呼び出し
    return this.itemsService.findAll();
  }

  @Get(':id') // /items/id というようなpathを想定
  findById(@Param('id') id: string): Item {
    return this.itemsService.findById(id);
  }

  @Post()
  create(
    @Body('id') id: string,
    @Body('name') name: string,
    @Body('price') price: number,
    @Body('description') description: string,
  ): Item {
    return this.itemsService.create({
      id,
      name,
      price,
      description,
      status: ItemStatus.ON_SALE,
    });
  }
}
