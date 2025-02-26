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

export function CloseCashierIcon({ size = 24, color = "currentColor" }) {
  return (
    <>
      <svg className="h-5 w-5 flex-shrink-0" width={size} height={size} viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M11 22.2631C11.304 22.4386 11.6489 22.5311 12 22.5311C12.3511 22.5311 12.696 22.4386 13 22.2631L20 18.2631C20.3037 18.0877 20.556 17.8356 20.7315 17.5319C20.9071 17.2283 20.9996 16.8838 21 16.5331V8.53311C20.9996 8.18238 20.9071 7.83792 20.7315 7.53427C20.556 7.23062 20.3037 6.97847 20 6.80311L13 2.80311C12.696 2.62757 12.3511 2.53516 12 2.53516C11.6489 2.53516 11.304 2.62757 11 2.80311L4 6.80311C3.69626 6.97847 3.44398 7.23062 3.26846 7.53427C3.09294 7.83792 3.00036 8.18238 3 8.53311V16.5331C3.00036 16.8838 3.09294 17.2283 3.26846 17.5319C3.44398 17.8356 3.69626 18.0877 4 18.2631L11 22.2631Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 22.5332V12.5332" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M3.2998 7.5332L11.0028 12.2672C11.3061 12.4416 11.6499 12.5334 11.9998 12.5334C12.3497 12.5334 12.6935 12.4416 12.9968 12.2672L20.6998 7.5332" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M7.5 4.80322L16.5 9.95322" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </>
  );
}

export function KeluarIcon({
  size = 24,
  color = "currentColor",
  className = "h-5 w-5 flex-shrink-0",
}) {
  return (
    <>
      <svg
        className={className}
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

// First Close Coponents
export function CloseSVG() {
  return (
    <>
      <svg
        width="24"
        height="25"
        viewBox="0 0 24 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 22.6699C17.5228 22.6699 22 18.1928 22 12.6699C22 7.14707 17.5228 2.66992 12 2.66992C6.47715 2.66992 2 7.14707 2 12.6699C2 18.1928 6.47715 22.6699 12 22.6699Z"
          stroke="#FF0000"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M15 9.66992L9 15.6699"
          stroke="#FF0000"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9 9.66992L15 15.6699"
          stroke="#FF0000"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </>
  );
}
// End Close Components

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

// First Filter Table
export function FilterSVG() {
  return (
    <>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M22 3H2L10 12.46V19L14 21V12.46L22 3Z"
          stroke="black"
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
// First Growth
export function GrowthSVG() {
  return (
    <>
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9.75 3.75H14.25V8.25"
          stroke="#00BF40"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14.25 3.75L3.75 14.25"
          stroke="#00BF40"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </>
  );
}
// End Growth

// First Decrease
export function DecreaseSVG() {
  return (
    <>
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M14.25 9.75V14.25H9.75"
          stroke="#FF0000"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M3.75 3.75L14.25 14.25"
          stroke="#FF0000"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </>
  );
}
// End Decrease

// First Product
export function ProductSVG() {
  return (
    <>
      <svg
        width="30"
        height="30"
        viewBox="0 0 30 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M23.75 3.75H6.25C4.86929 3.75 3.75 4.86929 3.75 6.25V23.75C3.75 25.1307 4.86929 26.25 6.25 26.25H23.75C25.1307 26.25 26.25 25.1307 26.25 23.75V6.25C26.25 4.86929 25.1307 3.75 23.75 3.75Z"
          stroke="black"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M3.75 11.25C3.75 10.587 4.01339 9.95107 4.48223 9.48223C4.95107 9.01339 5.58696 8.75 6.25 8.75H23.75C24.413 8.75 25.0489 9.01339 25.5178 9.48223C25.9866 9.95107 26.25 10.587 26.25 11.25"
          stroke="black"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M3.75 13.75H7.5C8.5 13.75 9.5 14.125 10.125 14.875L11.5 16C13.5 18 16.625 18 18.625 16L20 14.875C20.625 14.25 21.625 13.75 22.625 13.75H26.25"
          stroke="black"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </>
  );
}
// End Product

// First Money
export function MoneySVG() {
  return (
    <>
      <svg
        width="36"
        height="36"
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M30 9H6C4.34315 9 3 10.3431 3 12V24C3 25.6569 4.34315 27 6 27H30C31.6569 27 33 25.6569 33 24V12C33 10.3431 31.6569 9 30 9Z"
          stroke="black"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M18 21C19.6569 21 21 19.6569 21 18C21 16.3431 19.6569 15 18 15C16.3431 15 15 16.3431 15 18C15 19.6569 16.3431 21 18 21Z"
          stroke="black"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9 18H9.015M27 18H27.015"
          stroke="black"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </>
  );
}
// End Money

// First Meja
interface MejaSVGProps {
  strokeColor?: string;
  width?: number;
  height?: number;
}
export function MejaSVG({
  strokeColor = "#FEA026",
  width = 24,
  height = 24,
}: MejaSVGProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14 20.9617C11.4757 21.0582 9.16166 20.9724 6.23865 20.7048C5.19543 20.6092 4.36239 19.736 4.26588 18.6277C3.87042 14.0861 3.94716 10.903 4.292 6.41419C4.37877 5.28469 5.21856 4.38258 6.28078 4.28634C10.4928 3.90469 13.4667 3.9038 17.7331 4.28821C18.7928 4.38368 19.6326 5.28098 19.7203 6.4076C19.9822 9.77112 20.0688 12.3867 19.9433 15.3485M14 20.9617L19.9433 15.3485M14 20.9617V17.8485C14 16.4678 15.1193 15.3485 16.5 15.3485H19.9433M8 3V5.5M16 3V5.5"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M8 9.5H16"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M8 13H13"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
// End Meja

// First Riwayat
interface RiwayatSVGProps {
  strokeColor?: string;
  width?: number;
  height?: number;
  className?: string;
}
export function RiwayatSVG({
  strokeColor = "#FEA026",
  width = 24,
  height = 24,
  className = "", // Menambahkan className ke dalam props
}: RiwayatSVGProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className} // Menggunakan className pada tag svg
    >
      <circle cx="12" cy="12" r="9" stroke={strokeColor} strokeWidth="1.5" />
      <path
        d="M12 6.5V11.9586C12 11.9851 11.9895 12.0105 11.9707 12.0293L9 15"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

// First DropDownSVG
export function DropDownSVG() {
  return (
    <>
      <svg
        width="10"
        height="7"
        viewBox="0 0 10 7"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8.825 0.533203L5 4.34987L1.175 0.533203L-1.40117e-08 1.7082L5 6.7082L10 1.7082L8.825 0.533203Z"
          fill="#636363"
        />
      </svg>
    </>
  );
}
// End DropDownSVG

// First BackSVG
export function BackSVGKasir() {
  return (
    <>
      <svg
        width="20"
        height="16"
        viewBox="0 0 20 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2.25775 6.19723L1.55075 6.90423L0.84375 6.19723L1.55075 5.49023L2.25775 6.19723ZM19.2577 14.1972C19.2577 14.4625 19.1524 14.7168 18.9649 14.9043C18.7773 15.0919 18.523 15.1972 18.2577 15.1972C17.9925 15.1972 17.7382 15.0919 17.5506 14.9043C17.3631 14.7168 17.2577 14.4625 17.2577 14.1972H19.2577ZM6.55075 11.9042L1.55075 6.90423L2.96475 5.49023L7.96475 10.4902L6.55075 11.9042ZM1.55075 5.49023L6.55075 0.490234L7.96475 1.90423L2.96475 6.90423L1.55075 5.49023ZM2.25775 5.19723H12.2577V7.19723H2.25775V5.19723ZM19.2577 12.1972V14.1972H17.2577V12.1972H19.2577ZM12.2577 5.19723C14.1143 5.19723 15.8947 5.93473 17.2075 7.24749C18.5203 8.56024 19.2577 10.3407 19.2577 12.1972H17.2577C17.2577 10.8712 16.731 9.59938 15.7933 8.6617C14.8556 7.72402 13.5838 7.19723 12.2577 7.19723V5.19723Z"
          fill="#114F44"
        />
      </svg>
    </>
  );
}
// End BackSVG

// first TotalIncomeSVG
export function TotalIncomeSVG() {
  return (
    <>
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7.997 11.48C7.55167 11.48 7.17167 11.3217 6.857 11.005C6.54233 10.6883 6.385 10.3073 6.385 9.862C6.385 9.41667 6.54333 9.03667 6.86 8.722C7.17667 8.40733 7.558 8.25 8.004 8.25C8.45 8.25 8.83 8.40867 9.144 8.726C9.458 9.04333 9.61533 9.42433 9.616 9.869C9.61667 10.3137 9.458 10.6937 9.14 11.009C8.822 11.3243 8.441 11.4817 7.997 11.481M4.375 3.75H11.625L13.491 0H2.51L4.375 3.75ZM4.631 16H11.369C12.6557 16 13.749 15.5497 14.649 14.649C15.5497 13.7483 16 12.653 16 11.363C16 10.8243 15.9077 10.2997 15.723 9.789C15.5383 9.27833 15.2717 8.81333 14.923 8.394L11.881 4.75H4.119L1.077 8.394C0.728333 8.81333 0.461667 9.27833 0.277 9.789C0.0923333 10.299 0 10.8237 0 11.363C0 12.653 0.450333 13.7483 1.351 14.649C2.25167 15.5497 3.345 16 4.631 16Z"
          fill="#114F44"
        />
      </svg>
    </>
  );
}
// End TotalIncomeSVG

// first TotalTransactionsSVG
export function TotalTransactionsSVG() {
  return (
    <>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M13.015 14.554L11.901 16.93C11.8635 17.0102 11.8537 17.1006 11.8731 17.1869C11.8925 17.2733 11.94 17.3508 12.0081 17.4073C12.0763 17.4637 12.1613 17.496 12.2497 17.4991C12.3382 17.5021 12.4251 17.4757 12.497 17.424L17.297 13.955C17.3825 13.8931 17.4462 13.8057 17.479 13.7054C17.5118 13.6051 17.512 13.4969 17.4796 13.3965C17.4472 13.296 17.3838 13.2084 17.2986 13.1461C17.2133 13.0839 17.1106 13.0503 17.005 13.05H13.72L13.718 13.054H7V14.554H13.015ZM11.21 9.446L12.324 7.07C12.3618 6.98968 12.3718 6.89906 12.3525 6.81242C12.3331 6.72578 12.2855 6.64804 12.2171 6.59144C12.1487 6.53484 12.0634 6.50261 11.9747 6.49981C11.886 6.49702 11.7988 6.52382 11.727 6.576L6.927 10.045C6.84143 10.107 6.77768 10.1944 6.7449 10.2948C6.71212 10.3953 6.71198 10.5035 6.74452 10.604C6.77706 10.7045 6.8406 10.7921 6.92602 10.8543C7.01144 10.9164 7.11436 10.95 7.22 10.95H10.505L10.506 10.946H17.22V9.446H11.21ZM12 22C6.477 22 2 17.523 2 12C2 6.477 6.477 2 12 2C17.523 2 22 6.477 22 12C22 17.523 17.523 22 12 22Z"
          fill="#FEA026"
        />
      </svg>
    </>
  );
}
// End TotalTransactionsSVG

// first AverageIncomeSVG
export function AverageIncomeSVG() {
  return (
    <>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7 18C8.1 18 9 18.9 9 20C9 21.1 8.1 22 7 22C5.9 22 5 21.1 5 20C5 18.9 5.9 18 7 18ZM17 18C18.1 18 19 18.9 19 20C19 21.1 18.1 22 17 22C15.9 22 15 21.1 15 20C15 18.9 15.9 18 17 18ZM7.2 14.8C7.2 14.9 7.3 15 7.4 15H19V17H7C5.9 17 5 16.1 5 15C5 14.6 5.1 14.3 5.2 14L6.5 11.6L3 4H1V2H4.3L8.6 11H15.6L19.5 4L21.2 5L17.3 12C17 12.6 16.3 13 15.6 13H8.1L7.2 14.6V14.8ZM9.4 1C10.2 1 10.8 1.6 10.8 2.4C10.8 3.2 10.2 3.8 9.4 3.8C8.6 3.8 8 3.2 8 2.4C8 1.6 8.7 1 9.4 1ZM14.6 9C13.8 9 13.2 8.4 13.2 7.6C13.2 6.8 13.8 6.2 14.6 6.2C15.4 6.2 16 6.8 16 7.6C16 8.4 15.3 9 14.6 9ZM9.2 9L8 7.8L14.8 1L16 2.2L9.2 9Z"
          fill="#6E8FFF"
        />
      </svg>
    </>
  );
}
// End AverageIncomeSVG

// first ProductsSoldSVG
export function ProductsSoldSVG() {
  return (
    <>
      <svg
        width="16"
        height="19"
        viewBox="0 0 16 19"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M11.7876 4.65472C11.8143 4.58886 11.8269 4.51711 11.8242 4.44506H11.8464C11.7517 1.96067 9.88742 0 7.61977 0C5.35212 0 3.48781 1.96067 3.39318 4.44506C3.38205 4.51441 3.38203 4.58536 3.39311 4.65472H3.32696C2.24261 4.65472 1.08349 5.44235 0.746971 7.55962L0.0888875 13.3271C-0.449544 17.5616 1.53218 18.6202 4.11965 18.6202H11.1342C13.7142 18.6202 15.6361 17.0873 15.1575 13.3271L14.5069 7.55962C14.1105 5.50163 12.9888 4.65472 11.9194 4.65472H11.7876ZM10.5712 4.65472C10.5478 4.58777 10.5354 4.51678 10.5345 4.44506C10.5345 2.6598 9.2147 1.21257 7.58661 1.21257C5.95851 1.21257 4.63868 2.6598 4.63868 4.44506C4.64981 4.51441 4.64984 4.58536 4.63875 4.65472H10.5712ZM5.1592 9.44849C4.74619 9.44849 4.41138 9.06931 4.41138 8.60158C4.41138 8.13384 4.74619 7.75467 5.1592 7.75467C5.57221 7.75467 5.90702 8.13384 5.90702 8.60158C5.90702 9.06931 5.57221 9.44849 5.1592 9.44849ZM9.30961 8.60158C9.30961 9.06931 9.64442 9.44849 10.0574 9.44849C10.4704 9.44849 10.8053 9.06931 10.8053 8.60158C10.8053 8.13384 10.4704 7.75467 10.0574 7.75467C9.64442 7.75467 9.30961 8.13384 9.30961 8.60158Z"
          fill="#FF8F6B"
        />
      </svg>
    </>
  );
}
// End ProductsSoldSVG

// first ProductsSoldSVG
export function TotalIncomeGrafikSVG() {
  return (
    <>
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <mask
          id="mask0_704_2121"
          fontStyle="mask-type:luminance"
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="18"
          height="18"
        >
          <rect
            x="0.494141"
            y="0.360352"
            width="17.28"
            height="17.28"
            fill="white"
          />
        </mask>
        <g mask="url(#mask0_704_2121)">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M11.8947 15.8405C14.1024 15.8405 15.7961 15.0431 15.3151 11.8336L14.7549 7.48391C14.4583 5.88244 13.4368 5.26953 12.5405 5.26953H5.21201C4.30253 5.26953 3.34034 5.92858 2.99763 7.48391L2.43745 11.8336C2.02885 14.6806 3.67645 15.8405 5.88423 15.8405H11.8947Z"
            stroke="#FEA026"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M5.78516 5.11118C5.78516 3.39321 7.17785 2.00052 8.8958 2.00052C9.72308 1.99701 10.5177 2.32319 11.1039 2.90694C11.6901 3.49068 12.0197 4.2839 12.0197 5.11118"
            stroke="#FEA026"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M6.76074 8.35352H6.7937"
            stroke="#FEA026"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M10.959 8.35352H10.992"
            stroke="#FEA026"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </svg>
    </>
  );
}
// End ProductsSoldSVG

// first PrintSVG
export function PrintSVG({ className = "" }) {
  return (
    <>
      <svg
        className={className}
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6 9V2H18V9"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6 18H4C3.46957 18 2.96086 17.7893 2.58579 17.4142C2.21071 17.0391 2 16.5304 2 16V11C2 10.4696 2.21071 9.96086 2.58579 9.58579C2.96086 9.21071 3.46957 9 4 9H20C20.5304 9 21.0391 9.21071 21.4142 9.58579C21.7893 9.96086 22 10.4696 22 11V16C22 16.5304 21.7893 17.0391 21.4142 17.4142C21.0391 17.7893 20.5304 18 20 18H18"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M18 14H6V22H18V14Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </>
  );
}
// End PrintSVG

// first MoneyCashSVG
export function MoneyCashSVG({ className = "" }) {
  return (
    <>
      <svg
        className={className}
        fill="currentColor"
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          <path d="M 2 7 L 2 24 L 30 24 L 30 7 L 2 7 z M 6 9 L 26 9 C 26 10.105 26.895 11 28 11 L 28 20 C 26.895 20 26 20.895 26 22 L 6 22 C 6 20.895 5.105 20 4 20 L 4 11 C 5.105 11 6 10.105 6 9 z M 16 11 C 13.789 11 12 13.016 12 15.5 C 12 17.984 13.789 20 16 20 C 18.211 20 20 17.984 20 15.5 C 20 13.016 18.211 11 16 11 z M 16 13 C 17.102 13 18 14.121 18 15.5 C 18 16.879 17.102 18 16 18 C 14.898 18 14 16.879 14 15.5 C 14 14.121 14.898 13 16 13 z M 8.5 14 C 7.672 14 7 14.672 7 15.5 C 7 16.328 7.672 17 8.5 17 C 9.328 17 10 16.328 10 15.5 C 10 14.672 9.328 14 8.5 14 z M 23.5 14 C 22.672 14 22 14.672 22 15.5 C 22 16.328 22.672 17 23.5 17 C 24.328 17 25 16.328 25 15.5 C 25 14.672 24.328 14 23.5 14 z"></path>
        </g>
      </svg>
    </>
  );
}
// End MoneyCashSVG

// first MoneyCardSVG
export function MoneyCardSVG({ className = "" }) {
  return (
    <>
      <svg
        className={className}
        width="30"
        height="30"
        viewBox="0 0 30 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M25 6.25H5C3.61929 6.25 2.5 7.36929 2.5 8.75V21.25C2.5 22.6307 3.61929 23.75 5 23.75H25C26.3807 23.75 27.5 22.6307 27.5 21.25V8.75C27.5 7.36929 26.3807 6.25 25 6.25Z"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M2.5 12.5H27.5"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </>
  );
}
// End MoneyCardSVG

// first MoneyQrisSVG
export function MoneyQrisSVG({ className = "" }) {
  return (
    <>
      <svg
        className={className}
        width="30"
        height="30"
        viewBox="0 0 30 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8.75 3.75H5C4.30964 3.75 3.75 4.30964 3.75 5V8.75C3.75 9.44036 4.30964 10 5 10H8.75C9.44036 10 10 9.44036 10 8.75V5C10 4.30964 9.44036 3.75 8.75 3.75Z"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M25 3.75H21.25C20.5596 3.75 20 4.30964 20 5V8.75C20 9.44036 20.5596 10 21.25 10H25C25.6904 10 26.25 9.44036 26.25 8.75V5C26.25 4.30964 25.6904 3.75 25 3.75Z"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8.75 20H5C4.30964 20 3.75 20.5596 3.75 21.25V25C3.75 25.6904 4.30964 26.25 5 26.25H8.75C9.44036 26.25 10 25.6904 10 25V21.25C10 20.5596 9.44036 20 8.75 20Z"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M26.25 20H22.5C21.837 20 21.2011 20.2634 20.7322 20.7322C20.2634 21.2011 20 21.837 20 22.5V26.25"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M26.25 26.25V26.2625"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M15 8.75V12.5C15 13.163 14.7366 13.7989 14.2678 14.2678C13.7989 14.7366 13.163 15 12.5 15H8.75"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M3.75 15H3.7625"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M15 3.75H15.0125"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M15 20V20.0125"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M20 15H21.25"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M26.25 15V15.0125"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M15 26.25V25"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </>
  );
}
// End MoneyQrisSVG

// first WarningSVG
export function WarningSVG({ className = "" }) {
  return (
    <>
      <svg
        width="126"
        height="125"
        viewBox="0 0 126 125"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <path
          d="M62.9998 114.584C91.7647 114.584 115.083 91.2652 115.083 62.5003C115.083 33.7355 91.7647 10.417 62.9998 10.417C34.235 10.417 10.9165 33.7355 10.9165 62.5003C10.9165 91.2652 34.235 114.584 62.9998 114.584Z"
          stroke="#FEA026"
          strokeWidth="12"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M63 41.667V62.5003"
          stroke="#FEA026"
          strokeWidth="12"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M63 83.333H63.0521"
          stroke="#FEA026"
          strokeWidth="12"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </>
  );
}
// End WarningSVG

// First CustomerSVG
export function CustomerSVG() {
  return (
    <>
      <svg
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9.89899 1.33629H7.31288C7.05303 0.690384 6.37248 0.222656 5.56818 0.222656C4.76389 0.222656 4.08333 0.690384 3.82349 1.33629H1.23737C0.556818 1.33629 0 1.83743 0 2.44993V10.2454C0 10.8579 0.556818 11.359 1.23737 11.359H9.89899C10.5795 11.359 11.1364 10.8579 11.1364 10.2454V2.44993C11.1364 1.83743 10.5795 1.33629 9.89899 1.33629ZM5.56818 1.33629C5.90846 1.33629 6.18687 1.58686 6.18687 1.89311C6.18687 2.19936 5.90846 2.44993 5.56818 2.44993C5.2279 2.44993 4.9495 2.19936 4.9495 1.89311C4.9495 1.58686 5.2279 1.33629 5.56818 1.33629ZM5.56818 3.56357C6.5952 3.56357 7.42424 4.3097 7.42424 5.23402C7.42424 6.15834 6.5952 6.90447 5.56818 6.90447C4.54116 6.90447 3.71212 6.15834 3.71212 5.23402C3.71212 4.3097 4.54116 3.56357 5.56818 3.56357ZM9.2803 10.2454H1.85606V9.46584C1.85606 8.3522 4.33081 7.7397 5.56818 7.7397C6.80556 7.7397 9.2803 8.3522 9.2803 9.46584V10.2454Z"
          fill="#334155"
        />
      </svg>
    </>
  );
}

export function DeleteSVG() {
  return (
    <>
      <svg
        width="11"
        height="11"
        viewBox="0 0 11 11"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5.5 0.6875C2.81875 0.6875 0.6875 2.81875 0.6875 5.5C0.6875 8.18125 2.81875 10.3125 5.5 10.3125C8.18125 10.3125 10.3125 8.18125 10.3125 5.5C10.3125 2.81875 8.18125 0.6875 5.5 0.6875ZM7.35625 7.90625L5.5 6.05L3.64375 7.90625L3.09375 7.35625L4.95 5.5L3.09375 3.64375L3.64375 3.09375L5.5 4.95L7.35625 3.09375L7.90625 3.64375L6.05 5.5L7.90625 7.35625L7.35625 7.90625Z"
          fill="#EE1616"
        />
      </svg>
    </>
  );
}

export function NoteOrderSVG() {
  return (
    <>
      <svg
        width="14"
        height="13"
        viewBox="0 0 14 13"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7.43974 3.48384L10.2538 4.23305M6.83731 5.72144L8.24377 6.09634M6.90746 9.93787L7.46981 10.0882C9.06136 10.5126 9.85713 10.7242 10.4843 10.3641C11.1109 10.0045 11.3243 9.21283 11.7505 7.63071L12.3535 5.39252C12.7803 3.80981 12.9931 3.01875 12.6311 2.3951C12.2692 1.77145 11.474 1.55983 9.88189 1.13601L9.31954 0.985694C7.72799 0.561281 6.93222 0.349663 6.30562 0.709825C5.67843 1.0694 5.46504 1.86105 5.03827 3.44317L4.43584 5.68136C4.00907 7.26407 3.79568 8.05513 4.1582 8.67878C4.52013 9.30184 5.31591 9.51405 6.90746 9.93787Z"
          stroke="#114F44"
          strokeWidth="0.842105"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6.92102 11.6954L6.35985 11.8486C4.77183 12.2807 3.97842 12.497 3.35241 12.1298C2.72757 11.7631 2.51419 10.9568 2.08919 9.34281L1.48734 7.06041C1.06175 5.44705 0.848954 4.64007 1.2103 4.00463C1.52271 3.45466 2.20531 3.4747 3.0895 3.4747"
          stroke="#114F44"
          strokeWidth="0.842105"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </>
  );
}

export function NotesSVG() {
  return (
    <>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M14 20.9617C11.4757 21.0582 9.16166 20.9724 6.23865 20.7048C5.19543 20.6092 4.36239 19.736 4.26588 18.6277C3.87042 14.0861 3.94716 10.903 4.292 6.41419C4.37877 5.28469 5.21856 4.38258 6.28078 4.28634C10.4928 3.90469 13.4667 3.9038 17.7331 4.28821C18.7928 4.38368 19.6326 5.28098 19.7203 6.4076C19.9822 9.77112 20.0688 12.3867 19.9433 15.3485M14 20.9617L19.9433 15.3485M14 20.9617V17.8485C14 16.4678 15.1193 15.3485 16.5 15.3485H19.9433M8 3V5.5M16 3V5.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M8 9.5H16"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M8 13H13"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    </>
  );
}

export function HistorySVG() {
  return (
    <>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="12"
          cy="12"
          r="9"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M12 6.5V11.9586C12 11.9851 11.9895 12.0105 11.9707 12.0293L9 15"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    </>
  );
}

// first SuccessSVG
export function SuccessSVG({ className = "" }) {
  return (
    <>
      <svg className={className} width="126" height="125" viewBox="0 0 126 125" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M104.666 31.25L47.3747 88.5417L21.333 62.5" stroke="#00BF40" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </>
  );
}
// End SuccessSVG

// first MoneyCloseCashierSVG
export function MoneyCloseCashierSVG({ className = "" }) {
  return (
    <>
      <svg className={className} width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 17.5C14.1421 17.5 17.5 14.1421 17.5 10C17.5 5.85786 14.1421 2.5 10 2.5C5.85786 2.5 2.5 5.85786 2.5 10C2.5 14.1421 5.85786 17.5 10 17.5Z" stroke="#114F44" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M22.6123 12.9629C23.7939 13.4034 24.8454 14.1348 25.6695 15.0894C26.4936 16.044 27.0636 17.1909 27.327 18.4242C27.5903 19.6575 27.5384 20.9373 27.1761 22.1452C26.8138 23.3531 26.1527 24.4502 25.2541 25.3349C24.3554 26.2196 23.2482 26.8635 22.0348 27.2069C20.8214 27.5504 19.5409 27.5823 18.3119 27.2997C17.0829 27.0172 15.945 26.4293 15.0033 25.5904C14.0617 24.7515 13.3468 23.6888 12.9248 22.5004" stroke="#114F44" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8.75 7.5H10V12.5" stroke="#114F44" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M20.8873 17.3496L21.7623 18.2371L18.2373 21.7621" stroke="#114F44" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </>
  );
}
// End MoneyCloseCashierSVG