type ArrowSvgProps = {
  color?: string
}

export const ArrowSvg = ({ color = '#D0D4E1' }: ArrowSvgProps) => {
  return (
    <svg
      width="24.000000"
      height="24.000000"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <desc>Created with Pixso.</desc>
      <defs>
        <clipPath id="clip3834_678">
          <rect
            id="return-up-back"
            width="24.000000"
            height="24.000000"
            fill="white"
            fillOpacity="0"
          />
        </clipPath>
      </defs>
      <rect
        id="return-up-back"
        width="24.000000"
        height="24.000000"
        fill="#FFFFFF"
        fillOpacity="0"
      />
      <g clip-path="url(#clip3834_678)">
        <path
          id="Vector (Stroke)"
          d="M5.78027 6.96967C6.07324 7.26257 6.07324 7.73743 5.78027 8.03033L3.31067 10.5L5.78027 12.9697C6.07324 13.2626 6.07324 13.7374 5.78027 14.0303C5.48743 14.3232 5.01257 14.3232 4.71973 14.0303L1.71973 11.0303C1.42676 10.7374 1.42676 10.2626 1.71973 9.96967L4.71973 6.96967C5.01257 6.67676 5.48743 6.67676 5.78027 6.96967Z"
          fill={color}
          fillOpacity="1.000000"
          fillRule="evenodd"
        />
        <path
          id="Vector (Stroke)"
          d="M2.25 10.5C2.25 10.0858 2.58582 9.75 3 9.75L16.7812 9.75C19.9684 9.75 22.5 12.4169 22.5 15.5625L22.5 16.5C22.5 16.9142 22.1642 17.25 21.75 17.25C21.3358 17.25 21 16.9142 21 16.5L21 15.5625C21 13.2078 19.1029 11.25 16.7812 11.25L3 11.25C2.58582 11.25 2.25 10.9142 2.25 10.5Z"
          fill={color}
          fillOpacity="1.000000"
          fillRule="evenodd"
        />
      </g>
    </svg>
  )
}
