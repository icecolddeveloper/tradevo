function FashionIcon({
  size = 28,
  color = 'currentColor',
  strokeWidth = 1.8,
  className = '',
  ...props
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <path
        d="M8.2 4.2 4.4 7.4l2.4 3.1 1.7-1.2v10.5h7V9.3l1.7 1.2 2.4-3.1-3.8-3.2"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
      <path
        d="M9.2 4.2c.45 1.45 1.42 2.25 2.8 2.25s2.35-.8 2.8-2.25"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <path
        d="M9 14.6h6"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  );
}

export default FashionIcon;
