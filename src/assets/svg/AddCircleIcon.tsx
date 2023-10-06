import { FC } from 'react'

type Props = {
  className?: string
}

export const AddCircleIcon: FC<Props> = ({ className }) => {
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
        d="M1.5 8C1.5 4.41136 4.41136 1.5 8 1.5C11.5886 1.5 14.5 4.41136 14.5 8C14.5 11.5886 11.5886 14.5 8 14.5C4.41136 14.5 1.5 11.5886 1.5 8ZM8 2.5C4.96364 2.5 2.5 4.96364 2.5 8C2.5 11.0364 4.96364 13.5 8 13.5C11.0364 13.5 13.5 11.0364 13.5 8C13.5 4.96364 11.0364 2.5 8 2.5Z"
        fill="#EBEBEF"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8 5C8.27614 5 8.5 5.22386 8.5 5.5V10.5C8.5 10.7761 8.27614 11 8 11C7.72386 11 7.5 10.7761 7.5 10.5V5.5C7.5 5.22386 7.72386 5 8 5Z"
        fill="#EBEBEF"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5 8C5 7.72386 5.22386 7.5 5.5 7.5H10.5C10.7761 7.5 11 7.72386 11 8C11 8.27614 10.7761 8.5 10.5 8.5H5.5C5.22386 8.5 5 8.27614 5 8Z"
        fill="#EBEBEF"
      />
    </svg>
  )
}
