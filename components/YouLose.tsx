import { FC, useState } from 'react';
import styles from '../styles/YouLose.module.scss';

interface AnimatedNumberProps {
  userWon: boolean;
}

const YouLose: FC<AnimatedNumberProps> = (userWon) => {
  return (
    <div className={styles.container}>
      {userWon.userWon == false ? <h1 className={styles.title}>You Lose</h1> : <h1 className={styles.titleWon}>You Won!</h1>}
    </div>
  );
};

export default YouLose;