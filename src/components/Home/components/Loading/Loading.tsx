/* eslint-disable @typescript-eslint/ban-ts-ignore */
import React from 'react';
import clsx from 'clsx';
import * as styles from './styles';

const rnd = (Math.floor(Math.random() * 20) + 1).toString().padStart(2, '0');

export const Loading: React.FC = () => {
  const classes = styles.useStyles();
  // @ts-ignore
  const skyClass = classes[`sky-gradient-${rnd}`];

  return (
    <div className={clsx(classes.root, skyClass)}>
      <h1 className={classes.loading}>Loading...</h1>
    </div>
  );
};

export default Loading;
