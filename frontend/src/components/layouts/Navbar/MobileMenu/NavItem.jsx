import { NavLink } from 'react-router-dom';
import styles from './MobileMenu.module.css';
import { motion } from 'framer-motion';

const itemVariants = {
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

function NavItem({ idx, navItemObj, onClose }) {
  return (
    <motion.div
      variants={itemVariants}
      custom={idx}
      initial="hidden"
      animate="visible"
    >
      <NavLink
        to={navItemObj.to}
        end={navItemObj.to === '/'}
        className={({ isActive }) =>
          `${styles.drawer__link} ${isActive ? styles.drawer__link__active : ''}`
        }
        onClick={() => onClose()}
      >
        {navItemObj.label}
      </NavLink>
    </motion.div>
  );
}

export default NavItem;
