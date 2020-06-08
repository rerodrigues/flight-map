import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles({
  root: {
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  loading: {
    fontSize: 48,
    color: ' #FFFFFF',
    textShadow: '2px 2px 10px #474747',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    animation: '$flickerAnimation 3s ease infinite',
  },
  '@keyframes flickerAnimation': {
    '0%': { opacity: 0.6 },
    '50%': { opacity: 0.2 },
    '100%': { opacity: 0.6 },
  },
  icon: {
    opacity: '0.2',
  },

  'sky-gradient-1': {
    background: 'linear-gradient(to bottom, #40405c 0%,#6f71aa 80%,#8a76ab 100%)',
  },
  'sky-gradient-2': {
    background: 'linear-gradient(to bottom, #4a4969 0%,#7072ab 50%,#cd82a0 100%)',
  },
  'sky-gradient-3': {
    background: 'linear-gradient(to bottom, #757abf 0%,#8583be 60%,#eab0d1 100%)',
  },
  'sky-gradient-4': {
    background: 'linear-gradient(to bottom, #82addb 0%,#ebb2b1 100%)',
  },
  'sky-gradient-5': {
    background: 'linear-gradient(to bottom, #94c5f8 1%,#a6e6ff 70%,#b1b5ea 100%)',
  },
  'sky-gradient-6': {
    background: 'linear-gradient(to bottom, #b7eaff 0%,#94dfff 100%)',
  },
  'sky-gradient-7': {
    background: 'linear-gradient(to bottom, #9be2fe 0%,#67d1fb 100%)',
  },
  'sky-gradient-8': {
    background: 'linear-gradient(to bottom, #90dffe 0%,#38a3d1 100%)',
  },
  'sky-gradient-9': {
    background: 'linear-gradient(to bottom, #57c1eb 0%,#246fa8 100%)',
  },
  'sky-gradient-10': {
    background: 'linear-gradient(to bottom, #2d91c2 0%,#1e528e 100%)',
  },
  'sky-gradient-11': {
    background: 'linear-gradient(to bottom, #2473ab 0%,#1e528e 70%,#5b7983 100%)',
  },
  'sky-gradient-12': {
    background: 'linear-gradient(to bottom, #1e528e 0%,#265889 50%,#9da671 100%)',
  },
  'sky-gradient-13': {
    background: 'linear-gradient(to bottom, #1e528e 0%,#728a7c 50%,#e9ce5d 100%)',
  },
  'sky-gradient-14': {
    background: 'linear-gradient(to bottom, #154277 0%,#576e71 30%,#e1c45e 70%,#b26339 100%)',
  },
  'sky-gradient-15': {
    background: 'linear-gradient(to bottom, #163C52 0%,#4F4F47 30%,#C5752D 60%,#B7490F 80%, #2F1107 100%)',
  },
  'sky-gradient-16': {
    background: 'linear-gradient(to bottom, #071B26 0%,#071B26 30%,#8A3B12 80%,#240E03 100%)',
  },
});
