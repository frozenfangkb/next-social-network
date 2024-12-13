import styles from '@/pages/user-details/user-details.module.scss';
import { User } from '@/modules/user/models/user.ts';

interface UserDetailsProps {
  userData?: User;
}

export const UserDetailsData = ({ userData }: UserDetailsProps) => {
  return (
    <div className='flex flex-col gap-2'>
      <h1>Details</h1>
      <div className={styles.userDetailsSection}>
        <div className={styles.userDetailsSectionRow}>
          <span className={styles.userDetailsLabel}>City</span>
          <span className={styles.userDetailsValue}>
            {userData?.address?.city}
          </span>
        </div>
        <div className={styles.userDetailsSectionRow}>
          <span className={styles.userDetailsLabel}>Username</span>
          <span className={styles.userDetailsValue}>{userData?.username}</span>
        </div>
        <div className={styles.userDetailsSectionRow}>
          <span className={styles.userDetailsLabel}>Website</span>
          <span className={styles.userDetailsValue}>{userData?.website}</span>
        </div>
        <div className={styles.userDetailsSectionRow}>
          <span className={styles.userDetailsLabel}>Company</span>
          <span className={styles.userDetailsValue}>
            {userData?.company?.name}
          </span>
        </div>
      </div>
    </div>
  );
};
