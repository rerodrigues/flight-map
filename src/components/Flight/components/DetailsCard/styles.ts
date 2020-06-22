import { makeStyles, Theme, createStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: '100vh',
      overflow: 'auto',
    },
    section1: {
      marginBottom: theme.spacing(3),
    },
    list: {},
  }),
);
