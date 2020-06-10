import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() => ({
  root: {
    height: '100vh',
    overflow: 'auto',
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 1000,
    width: 400,
  },
}));
