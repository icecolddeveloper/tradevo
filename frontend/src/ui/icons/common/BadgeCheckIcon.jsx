function BadgeCheckIcon({ size = 24, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 2l2.4 2.4L17 3.5l.9 2.6 2.6.9-1 2.6L22 12l-2.4 2.4.9 2.6-2.6.9-.9 2.6-2.6-1L12 22l-2.4-2.4-2.6.9-.9-2.6-2.6-.9 1-2.6L2 12l2.4-2.4-.9-2.6 2.6-.9.9-2.6 2.6 1z" />
      <polyline points="9 12 11 14 15 10" />
    </svg>
  );
}

export default BadgeCheckIcon;
