import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { SLIDES, STATS } from '../../../data/heroData';
import { Link } from 'react-router-dom';
import styles from './HeroBanner.module.css';
import ArrowRight from '../../../ui/icons/common/ArrowRight';
import PrevArrow from '../../../ui/icons/common/PrevArrow';
import NextArrow from '../../../ui/icons/common/NextArrow';

// Variants
const slideVariants = {
  hidden: (direction) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
  }),
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: (direction) => ({
    x: direction > 0 ? '-10%' : '5%',
    opacity: 0,
    transition: {
      duration: 0,
      ease: 'easeIn',
    },
  }),
};

const contentVariants = {
  hidden: {
    y: 30,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      delay: 0.3,
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: {
    y: -10,
    opacity: 0,
  },
};

const badgeVariants = {
  hidden: {
    scale: 0.85,
    opacity: 0,
  },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      delay: 1,
      duration: 0.5,
    },
  },
  exit: {
    scale: 0.85,
    opacity: 0,
    transition: {
      duration: 0,
    },
  },
};

function HeroBanner() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const totalSlides = SLIDES.length;

  const next = useCallback(
    function handleNext() {
      setDirection(1);
      setCurrent((curVal) => (curVal + 1) % totalSlides);
    },
    [totalSlides],
  );

  function handlePrev() {
    setDirection(-1);
    setCurrent((curVal) => (curVal - 1 + totalSlides) % totalSlides);
  }

  useEffect(
    function () {
      const timerRef = setInterval(() => {
        next();
      }, 5500);

      return () => clearInterval(timerRef);
    },
    [next, current],
  );

  function handleGoto(idx) {
    const dir = idx > current ? 1 : -1;
    setDirection(dir);
    setCurrent(idx);
  }

  const slide = SLIDES[current]; // SLIDES[1] = obj

  return (
    <section className={styles.hero}>
      {/* Slider image background */}
      <div className={styles.hero__slider}>
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            className={styles.hero__slide_bg}
            variants={slideVariants}
            custom={direction}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <img src={slide.image} className={styles.hero__slide_img} alt="" />
            <div className={styles.hero__slide_overlay} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Content Container */}

      <div className={styles.hero__container}>
        <AnimatePresence mode="wait">
          {/* Hero Content */}
          <motion.div
            className={styles.hero__content}
            variants={contentVariants}
            key={slide.id + '-content'}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
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
          </motion.div>
        </AnimatePresence>

        {/* Floating badge */}
        <AnimatePresence mode="wait">
          <motion.div
            className={styles.hero__float__badge}
            variants={badgeVariants}
            key={slide.id + '-badge'}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
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
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className={styles.hero__controls}>
        <PrevArrow className={styles.hero__arrow} onClick={handlePrev} />

        <div className={styles.hero__dots}>
          {SLIDES.map((slideObj, i) => (
            <button
              key={slideObj.id}
              className={`${styles.hero__dot} ${i === current ? styles.hero__dot__active : ''}`}
              onClick={() => handleGoto(i)}
            />
          ))}
        </div>

        <NextArrow className={styles.hero__arrow} onClick={next} />
      </div>
    </section>
  );
}

export default HeroBanner;
