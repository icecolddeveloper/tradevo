import HeroBanner from '../../components/sections/HeroBanner/HeroBanner';
import styles from './Home.module.css';

function Home() {
  return (
    <div className={styles.home}>
      <HeroBanner />
    </div>
  );
}

export default Home;
