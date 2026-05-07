import { useEffect, useState } from 'react';
import { BADGES } from '../../../data/badgeData';
import Badge from './Badge';
import styles from './TrustBadges.module.css';

function TrustBadges() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(function () {
    function handleResize() {
      setIsMobile(window.innerWidth < 640);
    }

    handleResize();

    window.addEventListener('resize', handleResize);

    return function () {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const visibleBadges = isMobile ? BADGES.slice(0, 2) : BADGES;

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.grid}>
          {visibleBadges.map((badgeObj) => (
            <Badge key={badgeObj.title} badgeObj={badgeObj} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default TrustBadges;