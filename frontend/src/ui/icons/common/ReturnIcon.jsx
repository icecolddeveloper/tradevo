function ReturnIcon({ size = 24, className = '' }) {
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
      <path d="M9 14H4V9" />
      <path d="M4 14a9 9 0 1 0 1.41-4.93" />
    </svg>
  );
}

export default ReturnIcon;
