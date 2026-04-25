function SignOutIcon({ size = 22, className }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      className={className}
    >
      {/* Door */}
      <path
        d="M10 4h6a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Arrow pointing out */}
      <path
        d="M15 12H3m0 0l3-3m-3 3l3 3"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default SignOutIcon;
