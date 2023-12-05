import { getCookie } from 'cookies-next'
// import Cookies from 'js-cookie'
import { FC, PropsWithChildren, useEffect, useState } from 'react'

import { api } from '@/api/client'
import { COOKIES } from '@/app/constants/cookies'
import { useUserStore } from '@/app/store/user-store'

import { ConnectOverflow } from './ConnectOverflow'

export const ConnectProvider: FC<PropsWithChildren> = ({ children }) => {
  const [overflowOpened, setOverflowOpened] = useState(true)
  const { setConnectedUser, connectedUser } = useUserStore()

  useEffect(() => {
    if (connectedUser) {
      setOverflowOpened(false)
    } else {
      setOverflowOpened(true)
      const token = getCookie(COOKIES.AUTH_TOKEN)

      if (token) {
        api.accounts
          .getAccounts({ headers: { 'X-Authorization': token } })
          .then(data => setConnectedUser(data))
      }
    }
  }, [connectedUser])

  return (
    <>
      {children}
      <ConnectOverflow open={overflowOpened} />
    </>
  )
}
