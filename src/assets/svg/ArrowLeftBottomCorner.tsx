import { clsx } from 'clsx'
import { FC } from 'react'

type Props = {
  className?: string
}

export const ArrowLeftBottomCorner: FC<Props> = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="9"
      height="9"
      viewBox="0 0 9 9"
      fill="none"
      className={clsx('text-dark-base-green', className)}
    >
      <path
        d="M-4.05696e-07 2.32031C-3.68132e-07 2.10547 0.0722653 1.92578 0.216797 1.78125C0.361328 1.63672 0.53125 1.56445 0.726562 1.56445C0.925781 1.56445 1.0918 1.63672 1.22461 1.78125C1.36133 1.92578 1.42969 2.10156 1.42969 2.30859L1.42969 4.51172L1.3418 6.69727L2.27344 5.64844L7.6875 0.234376C7.84766 0.0781264 8.02539 1.4032e-06 8.2207 1.43735e-06C8.35352 1.46058e-06 8.47656 0.0351577 8.58984 0.10547C8.70312 0.175783 8.79492 0.26758 8.86523 0.380861C8.93555 0.494142 8.9707 0.615236 8.9707 0.744142C8.9707 0.939455 8.89062 1.11719 8.73047 1.27735L3.32226 6.69141L2.27344 7.62305L4.54687 7.54102L6.66797 7.54102C6.87109 7.54102 7.04492 7.60938 7.18945 7.7461C7.33398 7.88281 7.40625 8.04883 7.40625 8.24414C7.40625 8.43945 7.33594 8.60742 7.19531 8.74805C7.05469 8.89258 6.875 8.96484 6.65625 8.96484L0.779295 8.96484C0.541014 8.96484 0.351561 8.89258 0.210936 8.74805C0.0742172 8.60742 0.0058579 8.42383 0.00585794 8.19727L-4.05696e-07 2.32031Z"
        fill="currentColor"
      />
    </svg>
  )
}