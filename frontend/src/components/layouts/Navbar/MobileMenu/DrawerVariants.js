export const drawerVariant = {
  hidden: { x: '100%' } /* From: 0(start) - 100%(end) */,
  visible: {
    x: 0,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: {
    x: '100%',
    transition: {
      duration: 0.3,
      ease: 'easeIn',
    },
  },
};

export const itemVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: (idx) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: 0.1 + idx * 0.07,
      duration: 0.25,
    },
  }),
};

export const expandedVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.3 },
  },
  exit: {
    height: 0,
    opacity: 0,
  },
};