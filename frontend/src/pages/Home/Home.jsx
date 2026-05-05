import HeroBanner from '../../components/sections/HeroBanner/HeroBanner';
import TrustBadges from '../../components/sections/TrustBadges/TrustBadges';
import styles from './Home.module.css';

function Home() {
  return (
    <div className={styles.home}>
      <HeroBanner />

      <TrustBadges /> 
    </div>
  );
}

export default Home;

