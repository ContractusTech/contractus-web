import { Check } from 'lucide-react'

type Props = {
  children: React.ReactNode
  className?: string
  type?: 'owner' | 'default'
}

const Tag = ({ children, className, type }: Props) => {
  return (
    <div
      className={`flex items-center rounded-[13px]  p-[0px_5px] text-[12px] ${
        type === 'owner' ? 'text-[#000]' : 'text-[#8e8e8e]'
      } ${type === 'owner' ? 'bg-[#589648]' : 'bg-[#fff]'} ${className ?? ''}`}
    >
      {type === 'owner' && <Check size={12} />} {children}
    </div>
  )
}

export default Tag
