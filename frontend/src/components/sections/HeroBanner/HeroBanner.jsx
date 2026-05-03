import { Link } from 'react-router-dom';
import { SLIDES, STATS } from '../../../data/heroData';
import styles from './HeroBanner.module.css';
import ArrowRight from '../../../ui/icons/common/ArrowRight';

function HeroBanner() {
  const slide = SLIDES[3];

  return (
    <section className={styles.hero}>
      {/* Slider image background */}
      <div className={styles.hero__slider}>
        <img
          src={slide.image}
          className={styles.hero__slide_img}
          alt="Hero background"
        />

        <div className={styles.hero__slide_overlay} />
      </div>

      {/* Content Container */}
      <div className={styles.hero__container}>
        {/* Hero Content */}
        <div className={styles.hero__content}>
          <div className={styles.hero__eyebrow}>{slide.eyebrow}</div>

          <h1 className={styles.hero__headline}>
            {/* Headline */}
            {slide.headline} <br />
            {/* Headline accent */}
            <span className={styles.hero__headline__accent}>
              {slide.headlineAccent}
            </span>
          </h1>

          <p className={styles.hero__subtext}>{slide.sub}</p>

          <div className={styles.hero__ctas}>
            <Link to={slide.cta.to} className={styles.hero__cta_primary}>
              {slide.cta.label}
              <ArrowRight />
            </Link>
            <Link to={slide.cta.to} className={styles.hero__cta_ghost}>
              {slide.ctaGhost.label}
            </Link>
          </div>

          <div className={styles.hero__stats}>
            {STATS.map((stat, i) => (
              <div key={i} className={styles.hero__stat__container}>
                <span className={styles.hero__stat__value}>{stat.value}</span>
                <span className={styles.hero__stat__label}>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating badge */}
      <div className={styles.hero__float__badge}>
        <span className={styles.hero__float__badge__icon}>
          {slide.badge.icon}
        </span>

        <div>
          <p className={styles.hero__float__badge__title}>
            {slide.badge.title}
          </p>
          <p className={styles.hero__float__badge__subtitle}>
            {slide.badge.sub}
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className={styles.hero__controls}></div>
    </section>
  );
}

export default HeroBanner;
