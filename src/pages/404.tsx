import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

import RootLayout from '@/layouts/default'

const Page = () => {
  const router = useRouter()

  useEffect(() => {
    const pathname = window.location.pathname
    if (window.location.pathname.includes('deal')) {
      const id = pathname.split('/').at(-1)
      router.push(`/deal/${id}`)
    }
  }, [])

  return (
    <RootLayout>
      <></>
    </RootLayout>
  )
}

export default Page
