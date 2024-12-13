import { PhotoSchema } from '@/modules/photo/api/types.ts';
import { Photo } from '@/modules/photo/models/photo.ts';

/**
 * Converts a PhotoSchema object to a Photo object by asserting the type.
 * This function is used to adapt a schema representation of a photo
 * into the application's model representation.
 *
 * @param {PhotoSchema} photo - The photo object in schema format to be converted.
 * @returns {Photo} The photo object in application model format.
 */
export const adaptPhotoSchemaToModel = (photo: PhotoSchema): Photo => ({
  ...photo,
  thumbnailUrl: 'https://picsum.photos/50/50',
  url: 'https://picsum.photos/200',
});
