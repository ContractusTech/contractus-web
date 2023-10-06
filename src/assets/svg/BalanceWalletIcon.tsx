import { FC } from 'react'

type Props = {
  className?: string
}

export const BalanceWalletIcon: FC<Props> = ({ className }) => {
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
        d="M2.9844 3.25001H12.9844C13.1012 3.24995 13.2179 3.25736 13.3338 3.27219C13.2945 2.9965 13.1998 2.73161 13.0554 2.4935C12.911 2.2554 12.7198 2.049 12.4935 1.88676C12.2672 1.72452 12.0103 1.60979 11.7384 1.5495C11.4666 1.48921 11.1853 1.4846 10.9116 1.53594L2.68753 2.94001H2.67815C2.16192 3.03873 1.70286 3.3308 1.39471 3.75657C1.85896 3.42636 2.4147 3.24927 2.9844 3.25001Z"
        fill="#D5D9E0"
      />
      <path
        d="M12.9844 4H2.98438C2.45412 4.00058 1.94575 4.21148 1.5708 4.58643C1.19585 4.96137 0.984954 5.46974 0.984375 6V12C0.984954 12.5303 1.19585 13.0386 1.5708 13.4136C1.94575 13.7885 2.45412 13.9994 2.98438 14H12.9844C13.5146 13.9994 14.023 13.7885 14.3979 13.4136C14.7729 13.0386 14.9838 12.5303 14.9844 12V6C14.9838 5.46974 14.7729 4.96137 14.3979 4.58643C14.023 4.21148 13.5146 4.00058 12.9844 4ZM11.5 10C11.3022 10 11.1089 9.94135 10.9444 9.83147C10.78 9.72159 10.6518 9.56541 10.5761 9.38268C10.5004 9.19996 10.4806 8.99889 10.5192 8.80491C10.5578 8.61093 10.653 8.43275 10.7929 8.29289C10.9327 8.15304 11.1109 8.0578 11.3049 8.01921C11.4989 7.98063 11.7 8.00043 11.8827 8.07612C12.0654 8.15181 12.2216 8.27998 12.3315 8.44443C12.4414 8.60888 12.5 8.80222 12.5 9C12.5 9.26522 12.3946 9.51957 12.2071 9.70711C12.0196 9.89464 11.7652 10 11.5 10Z"
        fill="#D5D9E0"
      />
      <path
        d="M1 8.10938V5C1 4.32281 1.375 3.1875 2.67656 2.94156C3.78125 2.73437 4.875 2.73438 4.875 2.73438C4.875 2.73438 5.59375 3.23438 5 3.23438C4.40625 3.23438 4.42188 4 5 4C5.57812 4 5 4.73438 5 4.73438L2.67188 7.375L1 8.10938Z"
        fill="#D5D9E0"
      />
    </svg>
  )
}