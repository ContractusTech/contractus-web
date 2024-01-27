type TokenProps = {
  value: number
  reserve: number
  tokenLabel: string
}

export const Token = ({ reserve, tokenLabel, value }: TokenProps) => {
  return (
    <div className="rounded-[16px] border-[1px] border-solid border-[#262930] p-18">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-12">
          <span className="text-medium text-base leading-none">
            {tokenLabel}
          </span>
          <span className="text-normal text-base leading-none text-muted-foreground ">
            ${value.toFixed(3)}
          </span>
        </div>
        <div>
          <span className="text-medium text-base leading-none text-muted-foreground">
            {reserve.toFixed(1)}
          </span>
        </div>
      </div>
    </div>
  )
}
