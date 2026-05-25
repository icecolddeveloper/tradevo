function SelectCheckIcon({
  className = '',
  size = 22,
  multipleSelect = false,
  isSelected = false,
  handleItemSelect,
}) {
  // Colors
  const selectedBackgroundColor = 'var(--color-brand-primary)';
  const selectedCheckColor = '#ffffff';

  const unselectedCircleColor = '#9ca3af';

  // Hide icon completely when not in selection mode
  if (!multipleSelect) {
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
      onClick={handleItemSelect}
    >
      {/* Unselected state */}
      {!isSelected && (
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
      {isSelected && (
        <>
          <circle
            cx="12"
            cy="12"
            r="9"
            strokeWidth="2"
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
