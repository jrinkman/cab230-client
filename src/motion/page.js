const transition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.8,
};

const variants = {
  initial: {
    opacity: 0,
    x: '25vw',
  },
  in: {
    opacity: 1,
    x: 0,
  },
  out: {
    opacity: 0,
    x: '-25vw',
  },
};

export default {
  transition,
  variants,
};