import { Image } from './image.model'

export interface Category {
        id: number;
        name: string;
        image?: Image;
        sequence: number;
        featuredCategory?: boolean;
        allProducts?: boolean;
}
