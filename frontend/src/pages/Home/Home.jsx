import { flashDeals } from '../../data/mockProducts';
import FeaturedCategories from '../../components/sections/FeaturedCategories/FeaturedCategories';
import FlashDeals from '../../components/sections/FlashDeals/FlashDeals';
import HeroBanner from '../../components/sections/HeroBanner/HeroBanner';
import TrustBadges from '../../components/sections/TrustBadges/TrustBadges';
import styles from './Home.module.css';

function Home() {
  return (
    <div className={styles.home}>
      <HeroBanner />

      <TrustBadges />

      <FeaturedCategories />

      <FlashDeals timeDuration={24} flashProducts={flashDeals} />

      
    </div>
  );
}

export default Home;
