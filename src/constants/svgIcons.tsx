// For naming export functions always use Capital Letters at the beginning.

import React from "react";

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
