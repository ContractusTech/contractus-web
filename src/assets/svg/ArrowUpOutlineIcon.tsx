import { FC } from 'react'

type Props = {
  className?: string
}

export const ArrowUpOutlineIcon: FC<Props> = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className={className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.0303 8.15533C12.7374 8.44822 12.2626 8.44822 11.9697 8.15533L8 4.18566L4.03033 8.15533C3.73744 8.44822 3.26256 8.44822 2.96967 8.15533C2.67678 7.86244 2.67678 7.38756 2.96967 7.09467L7.46967 2.59467C7.76256 2.30178 8.23744 2.30178 8.53033 2.59467L13.0303 7.09467C13.3232 7.38756 13.3232 7.86244 13.0303 8.15533Z"
        fill="#EBEBEF"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8 13.625C7.58579 13.625 7.25 13.2892 7.25 12.875L7.25 3.75C7.25 3.33579 7.58579 3 8 3C8.41421 3 8.75 3.33579 8.75 3.75L8.75 12.875C8.75 13.2892 8.41421 13.625 8 13.625Z"
        fill="#EBEBEF"
      />
    </svg>
  )
}
