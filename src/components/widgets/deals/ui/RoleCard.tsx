import Image from 'next/image'

import { Role } from '@/app/types'

type RoleCardProps = {
  type: Role
  onClick: (type: RoleCardProps['type']) => void
  active?: boolean
}

const ICON_SIZE = 132

export const RoleCard = ({ type, onClick, active }: RoleCardProps) => {
  const handleClick = () => {
    onClick(type)
  }

  const image = type === 'EXECUTOR' ? 'executor-card.svg' : 'client-card.svg'

  return (
    <button
      onClick={handleClick}
      className="flex flex-col items-center rounded-[13px]  border-[1px] border-solid   border-[#656975]  p-[24px] outline outline-[3px]"
      style={{ outlineColor: active ? '#fff' : 'transparent' }}
    >
      <Image alt={type} src={image} width={ICON_SIZE} height={ICON_SIZE} />
      <span className="text-[20px] font-[600] text-[#fff]">
        {type === 'EXECUTOR' ? 'Executor' : 'Client'}
      </span>
      <span className="text-[16px] font-[500] text-[#656975]">
        If you pay to some service or product
      </span>
    </button>
  )
}
