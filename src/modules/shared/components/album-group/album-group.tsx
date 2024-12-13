import { Album } from '@/modules/album/models/album.ts';

import styles from './album-group.module.scss';
import { usePhotos } from '@/modules/photo/api/hooks/use-photos.ts';

interface AvatarGroupProps {
  albums: Album[];
}

export const AlbumGroup = ({ albums }: AvatarGroupProps) => {
  const { getAlbumPhoto } = usePhotos();
  const desiredAlbums = albums.slice(0, 3);

  return (
    <div
      className={styles.albumGroup}
      style={{ width: `${3 * desiredAlbums.length}rem`, height: '4rem' }}
    >
      {desiredAlbums.map((album, index) => (
        <div
          key={album.id}
          className={styles.album}
          style={{
            left: `${album.id * 15}%`,
            zIndex: 3 - index,
          }}
        >
          <div
            className={styles.cover}
            style={{ opacity: `${index * 0.25}` }}
          />
          <img
            className={styles.albumPhoto}
            src={getAlbumPhoto(album.id)?.thumbnailUrl ?? ''}
            width='2rem'
            height='2rem'
            alt={album.title}
          />
        </div>
      ))}
    </div>
  );
};
