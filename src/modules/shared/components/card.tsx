import React from 'react';
import styles from './card.module.scss';

interface CardProps {
  title: string;
  children: React.ReactNode;
}

export const Card = ({ title, children }: CardProps) => {
  return (
    <div className={styles.card}>
      <p className={styles.title}>{title}</p>
      {children}
    </div>
  );
};
