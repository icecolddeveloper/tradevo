function SystemIcon({ size = 22, ...props }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" {...props}>
      <rect
        x="3"
        y="4"
        width="18"
        height="14"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M8 20h8"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default SystemIcon;
