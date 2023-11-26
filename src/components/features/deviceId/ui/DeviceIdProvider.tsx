import { PropsWithChildren, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'

import { LOCAL_STORAGE } from '@/app/constants/localStorage'

export const DeviceIdProvider: React.FC<PropsWithChildren> = ({ children }) => {
  useEffect(() => {
    const storedDeviceId = localStorage.getItem(LOCAL_STORAGE.DEVICE_ID)
    if (!storedDeviceId) {
      localStorage.setItem(LOCAL_STORAGE.DEVICE_ID, uuidv4())
    }
  })

  return children
}
