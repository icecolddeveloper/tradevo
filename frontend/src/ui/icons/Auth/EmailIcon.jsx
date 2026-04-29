function EmailIcon({ size = 20, className }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer rounded shape */}
      <rect
        x="3"
        y="5"
        width="18"
        height="14"
        rx="4" // creates the curved edges
        stroke="currentColor"
        strokeWidth="1.6"
      />

      {/* Curved flap */}
      <path
        d="M5 7.5L10.94 12.05C11.57 12.53 12.43 12.53 13.06 12.05L19 7.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default EmailIcon;
