const LockIcon = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <rect width="24" height="24" fill="url(#pattern0_24_93)" />
      <defs>
        <pattern
          id="pattern0_24_93"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use xlinkHref="#image0_24_93" transform="scale(0.0104167)" />
        </pattern>
        <image
          id="image0_24_93"
          width="96"
          height="96"
          xlinkHref="data:image/png;base64,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"
        />
      </defs>
    </svg>
  );
};

export default LockIcon;
