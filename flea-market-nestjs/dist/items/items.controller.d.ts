import { ItemsService } from './items.service';
import { Item } from './item.model';
export declare class ItemsController {
    private readonly itemsService;
    constructor(itemsService: ItemsService);
    findAll(): Item[];
    findById(id: string): Item;
    create(id: string, name: string, price: number, description: string): Item;
}
