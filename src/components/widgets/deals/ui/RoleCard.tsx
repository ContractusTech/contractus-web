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
      className="flex flex-col items-center space-x-4 rounded-[13px] border-[1px] border-solid border-[#262930] bg-secondary p-[24px] outline outline-[3px] hover:bg-accent"
      style={{ outlineColor: active ? '#fff' : 'transparent' }}
    >
      <Image
        alt={type}
        src={image}
        width={ICON_SIZE}
        height={ICON_SIZE}
        priority
      />
      <span className="pb-4 text-lg font-[600] text-[#fff]">
        {type === 'EXECUTOR' ? 'Executor' : 'Client'}
      </span>
      <span className="text-sm font-[400] text-[#656975]">
        If you pay to some service or product
      </span>
    </button>
  )
}
