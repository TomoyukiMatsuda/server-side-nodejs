import { Body, Controller, Get, Post } from '@nestjs/common';
import { ItemsService } from './items.service';
import { Item } from './item.model';
import { ItemStatus } from './item-status.enum';

@Controller('items')
export class ItemsController {
  // DI
  constructor(private readonly itemsService: ItemsService) {}
  @Get()
  findAll() {
    // Serviceからビジネスロジックを呼び出し
    return this.itemsService.findAll();
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
