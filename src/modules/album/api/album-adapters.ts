import { AlbumSchema } from '@/modules/album/api/types.ts';
import { Album } from '@/modules/album/models/album.ts';

/**
 * Transforms an album object from the AlbumSchema format to the Album format.
 *
 * @function adaptAlbumSchemaToModel
 * @param {AlbumSchema} album - The album object in the AlbumSchema format.
 * @returns {Album} The album object adapted to the Album format.
 */
export const adaptAlbumSchemaToModel = (album: AlbumSchema): Album => ({
  ...album,
  image: 'https://picsum.photos/200',
});
