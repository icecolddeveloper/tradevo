function SelectCheckIcon({
  className = '',
  size = 22,
  isSelecting = false,
  selected = false,
  handleItemSelect,
}) {
  // Colors
  const selectedBackgroundColor = '#e15c3f';
  const selectedCheckColor = '#ffffff';

  const unselectedCircleColor = '#9ca3af';

  // Hide icon completely when not in selection mode
  if (!isSelecting) {
    return null;
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
    >
      {/* Unselected state */}
      {!selected && (
        <circle
          cx="12"
          cy="12"
          r="9"
          stroke={unselectedCircleColor}
          strokeWidth="2"
          fill="none"
        />
      )}

      {/* Selected state */}
      {selected && (
        <>
          <rect
            x="2"
            y="2"
            width="20"
            height="20"
            rx="6"
            fill={selectedBackgroundColor}
          />

          <path
            d="M7 12.5L10.2 15.5L17 8.8"
            stroke={selectedCheckColor}
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </>
      )}
    </svg>
  );
}

export default SelectCheckIcon;
