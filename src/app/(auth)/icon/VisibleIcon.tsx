const VisibleIcon = () => {
  return (
    <svg
      className="w-full h-full"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <rect width="24" height="24" fill="url(#pattern0_24_95)" />
      <defs>
        <pattern
          id="pattern0_24_95"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use xlinkHref="#image0_24_95" transform="scale(0.0104167)" />
        </pattern>
        <image
          id="image0_24_95"
          width="96"
          height="96"
          xlinkHref="data:image/png;base64,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"
        />
      </defs>
    </svg>
  );
};

export default VisibleIcon;
