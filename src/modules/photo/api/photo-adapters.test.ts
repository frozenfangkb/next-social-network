import { describe, expect, it } from 'vitest';
import { adaptPhotoSchemaToModel } from './photo-adapters';
import { Photo } from '@/modules/photo/models/photo.ts';
import { PhotoSchema } from '@/modules/photo/api/types.ts';

describe('adaptPhotoSchemaToModel', () => {
  it('should convert a PhotoSchema object into a Photo object with identical values', () => {
    const photoSchema: PhotoSchema = {
      albumId: 1,
      id: 101,
      title: 'Sample Photo',
      url: 'https://picsum.photos/200',
      thumbnailUrl: 'https://picsum.photos/50/50',
    };

    const result: Photo = adaptPhotoSchemaToModel(photoSchema);

    expect(result).toEqual<Photo>({
      albumId: 1,
      id: 101,
      title: 'Sample Photo',
      url: 'https://picsum.photos/200',
      thumbnailUrl: 'https://picsum.photos/50/50',
    });
  });
});
