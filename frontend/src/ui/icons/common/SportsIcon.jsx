function SportsIcon({
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
      <circle
        cx="12"
        cy="12"
        r="8.5"
        stroke={color}
        strokeWidth={strokeWidth}
      />
      <path
        d="M12 7.4 15.7 10l-1.4 4.25H9.7L8.3 10 12 7.4Z"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
      <path
        d="M12 3.5v3.9M4.3 9.2 8.3 10M19.7 9.2 15.7 10M7.2 18.7l2.5-4.45M16.8 18.7l-2.5-4.45"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  );
}

export default SportsIcon;
