function FoodDrinksIcon({
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
        d="M7.3 4.2h9.4l-.85 6.1a3.9 3.9 0 0 1-7.7 0L7.3 4.2Z"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
      <path
        d="M9 7.2h6"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <path
        d="M12 14.2v5.1"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <path
        d="M8.8 19.3h6.4"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <path
        d="M18.2 7.2h1.1c1 0 1.8.8 1.8 1.8s-.8 1.8-1.8 1.8h-1.55"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  );
}

export default FoodDrinksIcon;
