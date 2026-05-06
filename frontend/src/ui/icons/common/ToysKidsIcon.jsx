function ToysKidsIcon({
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
        d="M8 9.5a3 3 0 1 1 8 0v2.1c1.45.9 2.4 2.45 2.4 4.2 0 3-2.65 5.4-6.4 5.4s-6.4-2.4-6.4-5.4c0-1.75.95-3.3 2.4-4.2V9.5Z"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
      <path
        d="M7.7 8.2c-1.9-1.7-4.2-.6-4.2 1.55 0 1.45 1.2 2.45 2.55 2.45M16.3 8.2c1.9-1.7 4.2-.6 4.2 1.55 0 1.45-1.2 2.45-2.55 2.45"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <path
        d="M9.4 14.4h.02M14.6 14.4h.02"
        stroke={color}
        strokeWidth={strokeWidth + 1.2}
        strokeLinecap="round"
      />
      <path
        d="M10 17.2c1.15.8 2.85.8 4 0"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  );
}

export default ToysKidsIcon;
