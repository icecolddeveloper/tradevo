function PrevArrow({ onClick, className, handleDisable, size = 20 }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={className}
      disabled={handleDisable}
      aria-label="Previous page"
    >
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path
          d="M15 18l-6-6 6-6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

export default PrevArrow;
