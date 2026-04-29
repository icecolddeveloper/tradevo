function EyeIcon({ size = 20, className = '', open = true }) {
  return open ? (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
    >
      <path
        d="M2 12s4-6 10-6 10 6 10 6-4 6-10 6-10-6-10-6z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  ) : (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
    >
      <path
        d="M3 3l18 18"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M10.6 10.6a2 2 0 002.8 2.8"
        stroke="currentColor"
        strokeWidth="1.6"
      />
    </svg>
  );
}

export default EyeIcon;
