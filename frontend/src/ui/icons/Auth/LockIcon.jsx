function LockIcon({ size = 20, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
    >
      {/* Body */}
      <rect
        x="4"
        y="10"
        width="16"
        height="10"
        rx="4"
        stroke="currentColor"
        strokeWidth="1.6"
      />

      {/* Curved shackle */}
      <path
        d="M8 10V7a4 4 0 118 0v3"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default LockIcon;
