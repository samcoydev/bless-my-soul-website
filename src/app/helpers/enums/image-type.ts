export enum ImageType {
   Catalog = 'CATALOG',
   Thumbnail = 'THUMBNAIL',
}

export const ImageTypeLabelMapping: Record<ImageType, string> = {
   [ImageType.Catalog]: "Catalog",
   [ImageType.Thumbnail]: "Thumbnail",
};