function CartIcon({ size = 25, ...props }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" {...props}>
      <path
        d="M6 6h15l-1.5 9h-12z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <circle cx="9" cy="20" r="1.5" fill="currentColor" />
      <circle cx="18" cy="20" r="1.5" fill="currentColor" />
      <path
        d="M6 6L5 3H3"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default CartIcon;
