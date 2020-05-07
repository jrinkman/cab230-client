const transition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.8,
};

const variants = {
  initial: {
    opacity: 0,
    x: '25vw',
    overflowY: 'hidden',
  },
  in: {
    opacity: 1,
    x: 0,
    overflowY: 'auto',
  },
  out: {
    opacity: 0,
    x: '-25vw',
    overflowY: 'hidden',
  },
};

export default {
  transition,
  variants,
};
