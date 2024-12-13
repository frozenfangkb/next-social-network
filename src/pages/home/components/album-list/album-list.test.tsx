import { render, screen } from '@testing-library/react';
import { describe, it, vi, expect } from 'vitest';
import { AlbumList } from './album-list.tsx';
import { usePhotos } from '@/modules/photo/api/hooks/use-photos.ts';
import { Album } from '@/modules/album/models/album.ts';

vi.mock('@/modules/photo/api/hooks/use-photos.ts', () => ({
  usePhotos: vi.fn(),
}));

describe('UserAlbumList', () => {
  it('renders a list of albums with titles and photos', () => {
    const mockGetAlbumPhotos = vi.fn((id: number) => {
      if (id === 1) {
        return [
          { thumbnailUrl: 'photo1.jpg', title: 'Photo 1' },
          { thumbnailUrl: 'photo2.jpg', title: 'Photo 2' },
        ];
      }
      return [];
    });

    (usePhotos as jest.Mock).mockReturnValue({
      getAlbumPhotos: mockGetAlbumPhotos,
    });

    const albums: Album[] = [
      { id: 1, title: 'Album 1' },
      { id: 2, title: 'Album 2' },
    ] as unknown as Album[];

    render(<AlbumList albums={albums} />);

    expect(screen.getByText('Albums')).toBeInTheDocument();

    albums.forEach(album => {
      expect(screen.getByText(album.title)).toBeInTheDocument();
    });

    expect(screen.getByAltText('Photo 1')).toHaveAttribute('src', 'photo1.jpg');
    expect(screen.getByAltText('Photo 2')).toHaveAttribute('src', 'photo2.jpg');
  });

  it('renders no photos if getAlbumPhotos returns an empty array', () => {
    const mockGetAlbumPhotos = vi.fn(() => []);

    (usePhotos as jest.Mock).mockReturnValue({
      getAlbumPhotos: mockGetAlbumPhotos,
    });

    const albums = [{ id: 1, title: 'Album 1' }] as unknown as Album[];

    render(<AlbumList albums={albums} />);

    expect(screen.getByText('Album 1')).toBeInTheDocument();
    expect(screen.queryByRole('img')).toBeNull();
  });
});
