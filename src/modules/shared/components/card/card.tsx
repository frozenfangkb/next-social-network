import React from 'react';
import cln from 'classnames';
import styles from './card.module.scss';

interface CardProps {
  title: string;
  children: React.ReactNode;
  classNames?: string;
}

export const Card = ({ title, children, classNames }: CardProps) => {
  return (
    <div className={cln(styles.card, classNames)}>
      <p className={styles.title}>{title}</p>
      {children}
    </div>
  );
};
