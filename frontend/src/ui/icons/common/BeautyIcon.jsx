function BeautyIcon({
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
        d="M12 3.3l1.25 3.45L16.7 8l-3.45 1.25L12 12.7l-1.25-3.45L7.3 8l3.45-1.25L12 3.3Z"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
      <path
        d="M6.4 12.8l.75 2.05 2.05.75-2.05.75-.75 2.05-.75-2.05-2.05-.75 2.05-.75.75-2.05Z"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
      <path
        d="M17.9 13.2l.9 2.45 2.45.9-2.45.9-.9 2.45-.9-2.45-2.45-.9 2.45-.9.9-2.45Z"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default BeautyIcon;
