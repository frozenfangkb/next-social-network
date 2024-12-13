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
      url: 'https://example.com/photo.jpg',
      thumbnailUrl: 'https://example.com/thumb.jpg',
    };

    const result: Photo = adaptPhotoSchemaToModel(photoSchema);

    expect(result).toEqual<Photo>({
      albumId: 1,
      id: 101,
      title: 'Sample Photo',
      url: 'https://example.com/photo.jpg',
      thumbnailUrl: 'https://example.com/thumb.jpg',
    });
  });

  it('should retain the same reference when converting the object', () => {
    const photoSchema: PhotoSchema = {
      albumId: 1,
      id: 102,
      title: 'Another Photo',
      url: 'https://example.com/another-photo.jpg',
      thumbnailUrl: 'https://example.com/another-thumb.jpg',
    };

    const result: Photo = adaptPhotoSchemaToModel(photoSchema);

    expect(result).toBe(photoSchema);
  });
});
