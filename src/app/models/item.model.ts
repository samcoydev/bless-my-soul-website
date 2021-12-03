import { Category } from "./category.model";
import { StateType } from "../helpers/state-type";

export interface Item {
        id: number;
        name: string;
        price: number;
        description: string;
        state: StateType;
        category: Category;
}