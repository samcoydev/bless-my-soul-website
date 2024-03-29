import { Category } from "./category.model";
import { StateType } from "../helpers/enums/state-type";
import { Image } from './image.model'

export interface Item {
        id: number;
        name: string;
        price: number;
        description: string;
        state: StateType;
        category: Category;
        image: Image;
        featured?: boolean;
}