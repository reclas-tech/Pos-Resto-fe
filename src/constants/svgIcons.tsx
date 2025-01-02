// For naming export functions always use Capital Letters at the beginning.

import React from "react";

// Auth SVG
export function InvisibleIcon() {
  return (
    <>
      <svg
        className="w-full h-full"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5.8793 16.7065L1.29289 21.2929L2.70711 22.7071L7.31908 18.0951C9.98947 20.6438 14.048 20.6349 16.7087 18.0685L23 12L18.1207 7.29353L22.7071 2.70712L21.2929 1.29291L16.6809 5.90488C14.0105 3.3562 9.95199 3.36509 7.29129 5.93155L1 12L5.8793 16.7065ZM8.73383 16.6804L9.24261 16.1716C10.033 16.6951 10.9809 17 12 17C14.7614 17 17 14.7614 17 12C17 10.9809 16.6951 10.0331 16.1716 9.24263L16.7063 8.70797L20.1192 12L15.3202 16.629C13.443 18.4397 10.6288 18.4569 8.73383 16.6804ZM7.8284 14.7574L7.29375 15.2921L3.88082 12L8.67978 7.37103C10.557 5.56031 13.3712 5.54317 15.2662 7.31963L14.7574 7.82841C13.967 7.30489 13.0191 7.00001 12 7.00001C9.23858 7.00001 7 9.23859 7 12C7 13.0191 7.30488 13.967 7.8284 14.7574ZM10.7066 14.7076L14.7076 10.7066C14.895 11.0982 15 11.5369 15 12C15 13.6569 13.6569 15 12 15C11.5369 15 11.0982 14.8951 10.7066 14.7076ZM13.2934 9.29239L9.29237 13.2934C9.10495 12.9018 9 12.4632 9 12C9 10.3432 10.3431 9.00001 12 9.00001C12.4631 9.00001 12.9018 9.10497 13.2934 9.29239Z"
          fill="black"
        />
      </svg>
    </>
  );
}
export function LockIcon() {
  return (
    <>
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
    </>
  );
}
export function UserIcon() {
  return (
    <>
      <svg
        className="w-full h-full"
        viewBox="0 0 24 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <rect y="0.5" width="24" height="24" fill="url(#pattern0_44_71)" />
        <defs>
          <pattern
            id="pattern0_44_71"
            patternContentUnits="objectBoundingBox"
            width="1"
            height="1"
          >
            <use xlinkHref="#image0_44_71" transform="scale(0.0104167)" />
          </pattern>
          <image
            id="image0_44_71"
            width="96"
            height="96"
            xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAAAsTAAALEwEAmpwYAAAENklEQVR4nO2cy69PVxTHP8jV1O9Ggrg6EgPELTFRSaU1aROdI0zKQGm9+QfIjUkb0SiimEgHBswMTTwSbcXAo5o0HnWFgQSJAeW6N6kjO9YvLeHufZ77/M7v+0lW8sv5nbPOXmu/1977gBBCCCGEEEIIIYQQ9aMXWAkcAS4CD4ERk4d27TCwAmjFTmyT6AMOAE+BJFDcvfvtWZGR8cDOlI5/W54AO0yXSMEU4GwOx78tvwLTlANh9AN3CnR+WwZNt/CU/L9LcH5bXMZOVQ68m56Cm533yXn1Ce9mZwXOb8su1YI3mWYjlhDnXQY2W3veMum3a1cCdbwAZigT/uNAgNOGgDXAGN7PWGCt3evT9/MoerpuhvvU46znwGcpdH4ekAmuxmnGzOvwgq+0upKflnUBepdn0Ns4jgS0+a5pSYt75qpH96ES7Ok4LnqctCmH7q0e3b8XaEfH8sjjpDk5dH/s0f2gQDs6lmGPk1wnnZXegOFo1zNcYgZMVAbkb4L6c2SAmqACOuEtOTJguzphP4c9TrqSYxj6h2bDflYETJhceCEt3wboXZZBb+NoBYQihiy8EMriwFDEhBLt6ij2B5TWIQsvjNYcuf++CwzGHazQvtrTlyIcfdVmuHOt9vTa760Bbf7/M3N6bKPrxo5A5xUhA7GNrSM9WpKMzxQtysen37aQFN3s3M4Z2Ou6mnCm4J0Q2qaYoU/YZRHLrI4fsg7X6RIZmWEL6KHD1PYky43zNdQskJat4brMuGCLKcMmD+zaQQsvaIYrhBBCCCGEEEIIIUQKptr2ErcnaDdwEjgHXLLFlUcWqn5hv2/bf+fsXvfMN6ZDR1M9TAC+sNi9O6r6uIQVsce2yDNg7+rqiKk7aLcI+MEOSYxUuCOiLe6dvwHfA596Dv81hrlWAm9FcHjikXvAPtuB16jM+Mj2/NysgZOTQLlpae7oD3zMA44FnIBJaizDZoOruR3DbOAE8G8NHJgUJM6W48AsasyH1r7n2cWQ1FxGrJ/Ic2yqFOYD10sodYPAKWAvsB74ClgAzLR9Ph+Y9Nm1BXaPu/cne3awhNp43WyuBV/bpwTyGvUMOG216MuCPyPQMp0DNhd4VkB6n5vtUXGHqF/mMOIusMe+A1Hl5qkee+ePloas6Xe2byQSqzIm+r41KYtqMt5uTwr3Wtqy2FR5TZiVcqdaYrGabdZZ15XxwGrgr5S2/VPl9+jG2C600MS5U45LM550jMVY22EX+gGoSr87sSQwQa6GbADG0bmMs34utLa7jr50fglIyLW6T1pS4mz5M8Duo1SAL5DmDspNonlMtoI1mu03qkiIb8z/Cc1locd2N78oHV81bDpJbPujJyAy0e1PMz7uRimd2AYmNRdlAMqA6KUwUQ2I74hETVB8ZyQRRH0AyoDopTBpcg0QQgghhBBCCCGEEHQkrwALXAG3D4j6fgAAAABJRU5ErkJggg=="
          />
        </defs>
      </svg>
    </>
  );
}
export function VisibleIcon() {
  return (
    <>
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
    </>
  );
}
// Auth SVG

// First Admin Page
export function BerandaIcon({ size = 24, color = "currentColor" }) {
  return (
    <>
      <svg
        className="h-5 w-5 flex-shrink-0"
        width={size}
        height={size}
        viewBox="0 0 23 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <mask
          id="mask0_156_32"
          style={{ maskType: "luminance" }}
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="23"
          height="24"
        >
          <rect y="0.383301" width="22.7667" height="22.7667" fill="white" />
        </mask>
        <g mask="url(#mask0_156_32)">
          <path
            d="M9.7259 5.96526L9.98999 9.89247L10.1211 11.8663C10.1225 12.0693 10.1543 12.271 10.2157 12.4648C10.374 12.841 10.755 13.0801 11.1694 13.0634L17.4845 12.6503C17.758 12.6458 18.0221 12.7481 18.2186 12.9347C18.3825 13.0901 18.4882 13.2935 18.5216 13.5123L18.5328 13.6451C18.2715 17.2637 15.6137 20.282 12.0026 21.0611C8.39135 21.8402 4.68826 20.1944 2.90378 17.0171C2.38933 16.094 2.068 15.0795 1.95865 14.0329C1.91298 13.7231 1.89287 13.4101 1.89851 13.0971C1.89287 9.21746 4.65564 5.86339 8.52299 5.05481C8.98846 4.98232 9.44476 5.22874 9.63142 5.65334C9.6797 5.75168 9.71158 5.85699 9.7259 5.96526Z"
            fill={color}
          />
          <path
            opacity="0.4"
            d="M20.8696 9.69134L20.8629 9.72226L20.8438 9.76721L20.8464 9.89065C20.8365 10.0541 20.7734 10.2114 20.6647 10.3385C20.5513 10.4708 20.3965 10.5609 20.226 10.5959L20.1221 10.6102L12.836 11.0823C12.5936 11.1062 12.3523 11.028 12.1721 10.8673C12.0219 10.7333 11.9259 10.5525 11.8987 10.3577L11.4097 3.08215C11.4012 3.05755 11.4012 3.03089 11.4097 3.00628C11.4164 2.80573 11.5047 2.61617 11.6548 2.47994C11.8049 2.34371 12.0045 2.27217 12.2087 2.28129C16.5343 2.39134 20.1698 5.5018 20.8696 9.69134Z"
            fill={color}
          />
        </g>
      </svg>
    </>
  );
}

export function ProdukIcon({ size = 24, color = "currentColor" }) {
  return (
    <>
      <svg
        className="h-5 w-5 flex-shrink-0"
        width={size}
        height={size}
        viewBox="0 0 18 21"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15.1778 5.58266H13.2806C13.2806 2.92654 11.1936 0.8396 8.5375 0.8396C5.88139 0.8396 3.79444 2.92654 3.79444 5.58266H1.89722C0.85375 5.58266 0 6.43641 0 7.47988V18.8632C0 19.9067 0.85375 20.7604 1.89722 20.7604H15.1778C16.2213 20.7604 17.075 19.9067 17.075 18.8632V7.47988C17.075 6.43641 16.2213 5.58266 15.1778 5.58266ZM8.5375 2.73682C10.1501 2.73682 11.3833 3.97002 11.3833 5.58266H5.69167C5.69167 3.97002 6.92486 2.73682 8.5375 2.73682ZM15.1778 18.8632H1.89722V7.47988H15.1778V18.8632ZM8.5375 11.2743C6.92486 11.2743 5.69167 10.0411 5.69167 8.42849H3.79444C3.79444 11.0846 5.88139 13.1715 8.5375 13.1715C11.1936 13.1715 13.2806 11.0846 13.2806 8.42849H11.3833C11.3833 10.0411 10.1501 11.2743 8.5375 11.2743Z"
          fill={color}
        />
      </svg>
    </>
  );
}

export function KategoriIcon({ size = 24, color = "currentColor" }) {
  return (
    <>
      <svg
        className="h-5 w-5 flex-shrink-0"
        width={size}
        height={size}
        viewBox="0 0 20 21"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9 11.3333H5"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M17 7.33325H13"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M1 1.33325V17.3333C1 17.8637 1.21071 18.3724 1.58579 18.7475C1.96086 19.1225 2.46957 19.3333 3 19.3333H19"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16 3.33325H14C13.4477 3.33325 13 3.78097 13 4.33325V14.3333C13 14.8855 13.4477 15.3333 14 15.3333H16C16.5523 15.3333 17 14.8855 17 14.3333V4.33325C17 3.78097 16.5523 3.33325 16 3.33325Z"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8 6.33325H6C5.44772 6.33325 5 6.78097 5 7.33325V14.3333C5 14.8855 5.44772 15.3333 6 15.3333H8C8.55228 15.3333 9 14.8855 9 14.3333V7.33325C9 6.78097 8.55228 6.33325 8 6.33325Z"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </>
  );
}

export function DapurIcon({ size = 24, color = "currentColor" }) {
  return (
    <>
      <svg
        className="h-5 w-5 flex-shrink-0"
        width={size}
        height={size}
        viewBox="0 0 22 23"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1 11.8669H21"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M19 11.8669V19.8669C19 20.3974 18.7893 20.9061 18.4142 21.2812C18.0391 21.6562 17.5304 21.8669 17 21.8669H5C4.46957 21.8669 3.96086 21.6562 3.58579 21.2812C3.21071 20.9061 3 20.3974 3 19.8669V11.8669"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M3 7.86694L19 3.86694"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M7.86 6.64699L7.41 4.83699C7.34553 4.58222 7.33189 4.31724 7.36988 4.0572C7.40787 3.79716 7.49674 3.54716 7.6314 3.32148C7.76606 3.09581 7.94388 2.89889 8.15469 2.74197C8.3655 2.58505 8.60517 2.47122 8.86 2.40699L10.8 1.92699C11.0554 1.86267 11.3211 1.84945 11.5816 1.88808C11.8422 1.92671 12.0926 2.01643 12.3184 2.15209C12.5441 2.28775 12.7409 2.46668 12.8974 2.6786C13.0538 2.89052 13.1669 3.13126 13.23 3.38699L13.68 5.18699"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </>
  );
}

export function LaporanIcon({ size = 24, color = "currentColor" }) {
  return (
    <>
      <svg
        className="h-5 w-5 flex-shrink-0"
        width={size}
        height={size}
        viewBox="0 0 23 23"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M19.9208 18.9887H2.84583V4.75952"
          stroke={color}
          strokeWidth="1.42292"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M19.9208 6.65698L12.3319 13.2973L8.5375 9.50282L2.84583 14.2459"
          stroke={color}
          strokeWidth="1.42292"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </>
  );
}

export function MejaIcon({ size = 24, color = "currentColor" }) {
  return (
    <>
      <svg
        className="h-5 w-5 flex-shrink-0"
        width={size}
        height={size}
        viewBox="0 0 22 19"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M19 1.93335H3C1.89543 1.93335 1 2.82878 1 3.93335V15.9333C1 17.0379 1.89543 17.9333 3 17.9333H19C20.1046 17.9333 21 17.0379 21 15.9333V3.93335C21 2.82878 20.1046 1.93335 19 1.93335Z"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M5 5.93335H5.01"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9 5.93335H9.01"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M13 5.93335H13.01"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </>
  );
}

export function KaryawanIcon({ size = 24, color = "currentColor" }) {
  return (
    <>
      <svg
        className="h-5 w-5 flex-shrink-0"
        width={size}
        height={size}
        viewBox="0 0 20 23"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M14 1.46655V3.46655"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M15.915 21.4666C15.915 19.8753 15.2829 18.3491 14.1577 17.2239C13.0325 16.0987 11.5063 15.4666 9.91504 15.4666C8.32374 15.4666 6.79762 16.0987 5.6724 17.2239C4.54718 18.3491 3.91504 19.8753 3.91504 21.4666"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6 1.46655V3.46655"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10 15.4666C12.2091 15.4666 14 13.6757 14 11.4666C14 9.25741 12.2091 7.46655 10 7.46655C7.79086 7.46655 6 9.25741 6 11.4666C6 13.6757 7.79086 15.4666 10 15.4666Z"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M17 3.46655H3C1.89543 3.46655 1 4.36198 1 5.46655V19.4666C1 20.5711 1.89543 21.4666 3 21.4666H17C18.1046 21.4666 19 20.5711 19 19.4666V5.46655C19 4.36198 18.1046 3.46655 17 3.46655Z"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </>
  );
}

export function TransaksiIcon({ size = 24, color = "currentColor" }) {
  return (
    <>
      <svg
        className="h-5 w-5 flex-shrink-0"
        width={size}
        height={size}
        viewBox="0 0 20 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15 21H17C17.5304 21 18.0391 20.7893 18.4142 20.4142C18.7893 20.0391 19 19.5304 19 19V6L14 1H5C4.46957 1 3.96086 1.21071 3.58579 1.58579C3.21071 1.96086 3 2.46957 3 3V6"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M13 1V5C13 5.53043 13.2107 6.03914 13.5858 6.41421C13.9609 6.78929 14.4696 7 15 7H19"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M7 21C10.3137 21 13 18.3137 13 15C13 11.6863 10.3137 9 7 9C3.68629 9 1 11.6863 1 15C1 18.3137 3.68629 21 7 21Z"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8.5 16.5L7 15.25V13"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </>
  );
}

export function KeluarIcon({ size = 24, color = "currentColor" }) {
  return (
    <>
      <svg
        className="h-5 w-5 flex-shrink-0"
        width={size}
        height={size}
        viewBox="0 0 16 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M11.6974 12.9451L14.9433 9.15776C15.0984 8.98093 15.1777 8.7577 15.1778 8.5333C15.1779 8.37976 15.1409 8.22566 15.0657 8.08551C15.0323 8.02306 14.9915 7.96372 14.9433 7.90884L11.6974 4.12149C11.3565 3.72369 10.7576 3.67759 10.3598 4.01852C9.96203 4.35945 9.91593 4.95831 10.2569 5.35611L12.1668 7.58463L4.82016 7.58463C4.29625 7.58463 3.87155 8.00933 3.87155 8.53324C3.87155 9.05714 4.29625 9.48185 4.82016 9.48185L12.1669 9.48185L10.2569 11.7105C9.91593 12.1083 9.96203 12.7071 10.3598 13.0481C10.7576 13.389 11.3565 13.3429 11.6974 12.9451ZM5.69167 2.84156C6.21557 2.84156 6.64028 3.26627 6.64028 3.79017L6.64028 5.21309C6.64028 5.73699 7.06499 6.1617 7.58889 6.1617C8.11279 6.1617 8.5375 5.73699 8.5375 5.21309L8.5375 3.79017C8.5375 2.21846 7.26338 0.944336 5.69167 0.944336L2.84584 0.944335C1.27412 0.944335 1.85165e-06 2.21846 1.78295e-06 3.79017L1.3683e-06 13.2763C1.2996e-06 14.848 1.27412 16.1221 2.84584 16.1221L5.69167 16.1221C7.26338 16.1221 8.5375 14.848 8.5375 13.2763L8.5375 11.8534C8.5375 11.3295 8.11279 10.9048 7.58889 10.9048C7.06499 10.9048 6.64028 11.3295 6.64028 11.8534L6.64028 13.2763C6.64028 13.8002 6.21557 14.2249 5.69167 14.2249L2.84584 14.2249C2.32193 14.2249 1.89722 13.8002 1.89722 13.2763L1.89722 3.79017C1.89722 3.26627 2.32193 2.84156 2.84584 2.84156L5.69167 2.84156Z"
          fill={color}
        />
      </svg>
    </>
  );
}
// End Admin Page

// First Delete Coponents
export function DeleteModalSVG() {
  return (
    <>
      <svg
        className="h-20 w-20 flex-shrink-0"
        width="126"
        height="125"
        viewBox="0 0 126 125"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M69.25 93.75H56.75V81.25H69.25V93.75ZM69.25 68.75H56.75L56.75 31.25L69.25 31.25L69.25 68.75ZM63 125C97.5 125 125.5 97 125.5 62.5C125.5 28 97.5 0 63 0C28.5 0 0.5 28 0.5 62.5C0.5 97 28.5 125 63 125ZM63 12.5C90.5625 12.5 113 34.9375 113 62.5C113 90.0625 90.5625 112.5 63 112.5C35.4375 112.5 13 90.0625 13 62.5C13 34.9375 35.4375 12.5 63 12.5Z"
          fill="#EE1616"
        />
      </svg>
    </>
  );
}
// End Delete Components

// First Delete Close Coponents
export function CloseModalSVG() {
  return (
    <>
      <svg
        className="h-5 w-5 flex-shrink-0 text-gray-500"
        width="24"
        height="25"
        viewBox="0 0 24 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5 5.5L19 19.5M19 5.5L5 19.5"
          stroke="#282930"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    </>
  );
}
// End Delete Close Components

// First svg icon action
export function ActionSVG({ color = "currentColor" }) {
  return (
    <>
      <svg
        className="h-5 w-5 flex-shrink-0"
        width="5"
        height="15"
        viewBox="0 0 5 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2.49992 14.1209C2.04159 14.1209 1.64936 13.9579 1.32325 13.6318C0.996586 13.3051 0.833252 12.9126 0.833252 12.4543C0.833252 11.9959 0.996586 11.6034 1.32325 11.2768C1.64936 10.9507 2.04159 10.7876 2.49992 10.7876C2.95825 10.7876 3.35075 10.9507 3.67742 11.2768C4.00353 11.6034 4.16659 11.9959 4.16659 12.4543C4.16659 12.9126 4.00353 13.3051 3.67742 13.6318C3.35075 13.9579 2.95825 14.1209 2.49992 14.1209ZM2.49992 9.12093C2.04159 9.12093 1.64936 8.9576 1.32325 8.63093C0.996586 8.30482 0.833252 7.9126 0.833252 7.45426C0.833252 6.99593 0.996586 6.60343 1.32325 6.27676C1.64936 5.95065 2.04159 5.7876 2.49992 5.7876C2.95825 5.7876 3.35075 5.95065 3.67742 6.27676C4.00353 6.60343 4.16659 6.99593 4.16659 7.45426C4.16659 7.9126 4.00353 8.30482 3.67742 8.63093C3.35075 8.9576 2.95825 9.12093 2.49992 9.12093ZM2.49992 4.12093C2.04159 4.12093 1.64936 3.9576 1.32325 3.63093C0.996586 3.30482 0.833252 2.9126 0.833252 2.45426C0.833252 1.99593 0.996586 1.60371 1.32325 1.2776C1.64936 0.950931 2.04159 0.787598 2.49992 0.787598C2.95825 0.787598 3.35075 0.950931 3.67742 1.2776C4.00353 1.60371 4.16659 1.99593 4.16659 2.45426C4.16659 2.9126 4.00353 3.30482 3.67742 3.63093C3.35075 3.9576 2.95825 4.12093 2.49992 4.12093Z"
          fill={color}
        />
      </svg>
    </>
  );
}
// End svg icon action

// First svg back
export function BackSVG() {
  return (
    <>
      <svg
        className=" flex-shrink-0"
        width="11"
        height="18"
        viewBox="0 0 10 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M9.49941 16.438L8.45441 17.5L0.788407 9.71C0.603909 9.5197 0.500732 9.26505 0.500732 9C0.500732 8.73495 0.603909 8.4803 0.788407 8.29L8.45441 0.5L9.49941 1.563L2.18141 9L9.49941 16.438Z"
          fill="white"
        />
      </svg>
    </>
  );
}
// End svg back

// First Filter Table
export function FilterTableSVG() {
  return (
    <>
      <svg
        className=" flex-shrink-0"
        width="19"
        height="19"
        viewBox="0 0 19 19"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2.49902 5.11084H15.999"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M5.49902 9.61084H12.999"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M7.74902 14.1108H10.749"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </>
  );
}
// End Filter Table

// First Loading
export function LoadingSVG() {
  return (
    <>
      <svg
        className="animate-spin h-5 w-5 text-white flex-shrink-0 flex m-auto justify-center items-center text-center"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.964 7.964 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    </>
  );
}
// End Loading
