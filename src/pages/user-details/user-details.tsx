import { useNavigate, useParams } from 'react-router';
import { useAlbums } from '@/modules/album/api/hooks/use-albums.ts';

import styles from './user-details.module.scss';
import { FadeLoader } from 'react-spinners';
import { useUsers } from '@/modules/user/api/hooks/use-users.ts';
import { AlbumGroup } from '@/modules/shared/components/album-group/album-group.tsx';

export const UserDetails = () => {
  const params = useParams();
  const userId = params.userId;
  const navigate = useNavigate();

  const { data, isFetching: isFetchingAlbums } = useAlbums(userId);
  const { getUserData } = useUsers();

  if (!userId) {
    navigate('/');
  }

  const userData = getUserData(Number(userId));
  const albums = data?.filter(album => album.userId === Number(userId));

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        {isFetchingAlbums ? (
          <FadeLoader color='#a1a1a1' />
        ) : (
          <AlbumGroup albums={albums} />
        )}
        <h1>{userData?.name}</h1>
      </div>
    </div>
  );
};
