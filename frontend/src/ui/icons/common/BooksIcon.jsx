function BooksIcon({
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
        d="M5.2 4.5h6.1c1.1 0 2 .9 2 2v12.2c0-.9-.75-1.65-1.65-1.65H5.2V4.5Z"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
      <path
        d="M18.8 4.5h-5.5v14.2c0-.9.75-1.65 1.65-1.65h3.85V4.5Z"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
      <path
        d="M7.5 8h3.1M7.5 11h3.1M15.5 8h1.4M15.5 11h1.4"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  );
}

export default BooksIcon;
