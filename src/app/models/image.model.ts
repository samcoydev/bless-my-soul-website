import { ImageType } from '../helpers/enums/image-type'

export interface Image {
        id: number;
        name: string;
        type: ImageType;
        url: string;
}