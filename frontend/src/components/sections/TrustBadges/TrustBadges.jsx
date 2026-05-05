import { BADGES } from '../../../data/badgeData';
import Badge from './Badge';
import styles from './TrustBadges.module.css';

function TrustBadges() {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.grid}>
          {BADGES.map((badgeObj) => (
            <Badge key={badgeObj.icon} badgeObj={badgeObj} />
          ))}
        </div>
      </div>
    </section>
  );
}



export default TrustBadges;
