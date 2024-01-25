type Props = {
  children: React.ReactNode
  className?: string
}

const Tag = ({ children, className }: Props) => {
  return (
    <div
      className={
        `rounded-[13px] bg-[#fff] p-[0px_5px] text-[12px] text-[#8e8e8e] ` +
        className
      }
    >
      {children}
    </div>
  )
}

export default Tag
