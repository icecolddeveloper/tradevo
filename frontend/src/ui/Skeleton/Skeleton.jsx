import styles from './Skeleton.module.css';

/* ============================================================
   TRADEVO — Skeleton
   Animated shimmer placeholder used while content loads.
   Props:
   - width, height: CSS values e.g. '100%', '200px'
   - borderRadius: CSS value
   - count: how many to render in a stack
   ============================================================ */

export default function Skeleton({
  width = '100%',
  height = '10px',
  borderRadius,
  className = '',
}) {
  const style = {
    width,
    height,
    ...(borderRadius && { borderRadius }),
  };

  return (
    <>
      <div
        className={`skeleton  ${styles.skeleton} ${className}`}
        style={style}
        aria-hidden="true"
      />
    </>
  );
}

/* Pre-built ProductCard skeleton: Skeleton component have the animation */
export function ProductCardSkeleton() {
  return (
    <div className={styles.card_skeleton}>
      {/* Image */}
      <Skeleton height="140px" borderRadius="12px" />

      <div
        style={{
          padding: '12px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
        }}
      >
        <Skeleton height="12px" width="60%" />
        <Skeleton height="16px" width="90%" />
        <Skeleton height="12px" width="40%" />
        <Skeleton height="20px" width="50%" />
      </div>
    </div>
  );
}
