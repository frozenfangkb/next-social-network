import { describe, expect, it } from 'vitest';
import { adaptAlbumSchemaToModel } from './album-adapters';
import { AlbumSchema } from '@/modules/album/api/types.ts';
import { Album } from '@/modules/album/models/album.ts';

describe('adaptAlbumSchemaToModel', () => {
  it('should adapt an AlbumSchema object to an Album object', () => {
    const albumSchema: AlbumSchema = {
      userId: 1,
      id: 100,
      title: 'Test Album',
    };

    const adaptedAlbum: Album = adaptAlbumSchemaToModel(albumSchema);

    expect(adaptedAlbum).toEqual({
      userId: 1,
      id: 100,
      title: 'Test Album',
      image: 'https://picsum.photos/200',
    });
  });

  it('should not modify the original AlbumSchema object', () => {
    const albumSchema: AlbumSchema = {
      userId: 2,
      id: 101,
      title: 'Album Title',
    };

    adaptAlbumSchemaToModel(albumSchema);

    expect(albumSchema).toEqual({
      userId: 2,
      id: 101,
      title: 'Album Title',
    });
  });
});
