import styles from './home.module.scss';
import { UsersList } from './components/users-list/users-list.tsx';
import { Album } from '@/modules/album/models/album.ts';
import { AlbumList } from '@/pages/home/components/album-list/album-list.tsx';

export const Home = () => {
  const recentAlbums = localStorage.getItem('recentAlbums');
  const albums: Album[] = recentAlbums ? JSON.parse(recentAlbums) : [];

  return (
    <div className={styles.container}>
      <h1>Home</h1>
      <div className='flex flex-row justify-between'>
        <UsersList />
        {albums.length > 0 && <AlbumList isRecent={true} albums={albums} />}
      </div>
    </div>
  );
};
