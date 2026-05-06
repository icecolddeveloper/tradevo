function ElectronicsIcon({
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
      <rect
        x="7"
        y="2.8"
        width="10"
        height="18.4"
        rx="2.4"
        stroke={color}
        strokeWidth={strokeWidth}
      />
      <path
        d="M10 5h4"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <path
        d="M11.2 18.2h1.6"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <path
        d="M4.5 8.5c-1.2 2.1-1.2 4.9 0 7M19.5 8.5c1.2 2.1 1.2 4.9 0 7"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  );
}

export default ElectronicsIcon;
