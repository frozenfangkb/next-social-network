import { useParams } from 'react-router';
import { useAlbums } from '@/modules/album/api/hooks/use-albums.ts';

import styles from './user-details.module.scss';
import { FadeLoader } from 'react-spinners';
import { useUsers } from '@/modules/user/api/hooks/use-users.ts';
import { AlbumGroup } from '@/modules/shared/components/album-group/album-group.tsx';
import { UserDetailsData } from '@/pages/home/components/user-details-data/user-details-data.tsx';
import { AlbumList } from '@/pages/home/components/album-list/album-list.tsx';
import { useMemo } from 'react';

export const UserDetails = () => {
  const params = useParams();
  const userId = params.userId;

  const { data, isFetching: isFetchingAlbums } = useAlbums(userId);
  const { getUserData } = useUsers();

  const userData = getUserData(Number(userId));
  const albums = data?.filter(album => album.userId === Number(userId));

  useMemo(() => {
    localStorage.setItem('recentAlbums', JSON.stringify(albums));
  }, [albums]);

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        {isFetchingAlbums ? (
          <FadeLoader color='#a1a1a1' data-testid='fade-loader' />
        ) : (
          <AlbumGroup albums={albums} />
        )}
        <div className={styles.userDetailsSubtitle}>
          <h1>{userData?.name}</h1>
          <span className='subtitle'>
            {userData?.email} · {userData?.phone}
          </span>
        </div>
      </div>
      <div className='flex flex-row md:justify-between'>
        <UserDetailsData userData={userData} />
        <AlbumList albums={albums} />
      </div>
    </div>
  );
};
