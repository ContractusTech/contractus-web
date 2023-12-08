import { FC } from 'react'

import { TokenListType } from '@/api/modules/tokens/tokens.types'

import { TokensList } from './TokensList'

type Props = {
  tokens?: TokenListType
}
export const SelectTokensList: FC<Props> = ({ tokens }) => {
  return <div className="px-32">{tokens && <TokensList tokens={tokens} />}</div>
}
