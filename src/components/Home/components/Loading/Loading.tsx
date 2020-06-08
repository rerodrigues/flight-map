import React from 'react';
import clsx from 'clsx';
import * as styles from './styles';
import { PlaneIcon } from '.';

const numOfSkies = 16;
const randomSky = Math.floor(Math.random() * numOfSkies) + 1;

export const Loading: React.FC = () => {
  const classes = styles.useStyles() as Record<string, string>;
  const skyClass = classes[`sky-gradient-${randomSky}`];

  return (
    <div className={clsx(classes.root, skyClass)}>
      <PlaneIcon className={classes.icon} />
      <h1 className={classes.loading}>Loading...</h1>
    </div>
  );
};

export default Loading;
