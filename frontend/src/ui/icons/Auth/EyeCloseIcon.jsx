function EyeCloseIcon({ size = 20, className = '' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* eye outline */}
      <path d="M17.94 17.94A10.94 10.94 0 0 1 12 19C7 19 2.73 15.11 1 12c.69-1.23 1.73-2.57 3.06-3.78" />

      <path d="M9.9 4.24A10.94 10.94 0 0 1 12 5c5 0 9.27 3.89 11 7-1.02 1.82-2.69 3.71-4.94 5.05" />

      {/* pupil (partial) */}
      <path d="M9.88 9.88a3 3 0 0 0 4.24 4.24" />

      {/* slash (designed, not corner-to-corner) */}
      <line x1="3" y1="3" x2="21" y2="21" />
    </svg>
  );
}

export default EyeCloseIcon;
