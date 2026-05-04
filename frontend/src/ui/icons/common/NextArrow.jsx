function NextArrow({ onClick, className }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={className}
      aria-label="Next slide"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path
          d="M9 18l6-6-6-6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

export default NextArrow;
