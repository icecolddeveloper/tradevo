function HeartIcon({ size = 22, className }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      className={className}
    >
      <path
        d="M20.5 5.5a5 5 0 0 0-7.07 0L12 6.93l-1.43-1.43a5 5 0 1 0-7.07 7.07l1.43 1.43L12 21l7.07-7.07 1.43-1.43a5 5 0 0 0 0-7.07z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default HeartIcon;
