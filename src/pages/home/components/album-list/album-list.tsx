import { Album } from '@/modules/album/models/album.ts';

import styles from './album-list.module.scss';
import { usePhotos } from '@/modules/photo/api/hooks/use-photos.ts';

interface UserAlbumListProps {
  albums: Album[];
  isRecent?: boolean;
}

export const AlbumList = ({ albums, isRecent }: UserAlbumListProps) => {
  const { getAlbumPhotos } = usePhotos();

  return (
    <div className={styles.container}>
      <h1>{isRecent ? 'Recent albums' : 'Albums'}</h1>
      <div className={styles.itemList}>
        {albums.map(album => (
          <div key={album.id} className={styles.item}>
            <p>{album.title}</p>
            <div>
              <div className={styles.albumList}>
                {getAlbumPhotos(album.id)?.map(photo => (
                  <img
                    key={photo.id}
                    src={photo.thumbnailUrl}
                    alt={photo.title}
                    width='100'
                    height='100'
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
