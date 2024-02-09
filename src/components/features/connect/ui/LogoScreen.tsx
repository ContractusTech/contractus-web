import { useAutoAnimate } from '@formkit/auto-animate/react'
import Image from 'next/image'

type LogoScreen = {
  loading: boolean
}

export const LogoScreen = ({ loading }: LogoScreen) => {
  const [parent] = useAutoAnimate()

  return (
    <div
      ref={parent}
      className={`${
        loading ? 'opacity-1' : 'opacity-0'
      } fixed z-[1] flex h-[100vh] w-[100vw] items-center justify-center bg-black transition-all`}
    >
      <Image src={'/logo-full.svg'} alt="logo" width={140} height={40} />
    </div>
  )
}
