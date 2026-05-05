import styles from './TrustBadges.module.css';

function Badge({ badgeObj }) {
  const Icon = badgeObj.icon;

  return (
    <div className={styles.badge__container}>
      <span>
        <Icon size="25" className={styles.badge__icon} />
      </span>

      <div className={styles.badge__content}>
        <p className={styles.badge__title}>{badgeObj.title}</p>
        <p className={styles.badge__sub}>{badgeObj.sub}</p>
      </div>
    </div>
  );
}

export default Badge;
