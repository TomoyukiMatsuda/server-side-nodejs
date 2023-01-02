import { Item } from './item.model';
export declare class ItemsService {
    private items;
    findAll(): Item[];
    findById(id: string): Item;
    create(item: Item): Item;
}
