import Image from 'next/image'

export const EmptyPlaceholder = () => {
  return (
    <div className=" col-start-2 flex flex-col gap-[11px] text-center">
      <div className="flex flex-col">
        <Image
          width={147}
          height={158}
          src="/emptyDeal.png"
          alt="deal list empty"
        />
        <span className="text-[19px] text-[#2C3136]">No deals, yet</span>
      </div>
      <span className="text-[12px] text-[#2C3136]">
        Your account must be specified in deal or create own deal by tap on «New
        Deal»
      </span>
    </div>
  )
}
