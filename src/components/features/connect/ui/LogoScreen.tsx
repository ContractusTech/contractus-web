import Image from 'next/image'

export const LogoScreen = () => {
  return (
    <div className="flex h-[100vh] w-[100vw] items-center justify-center bg-black">
      <Image src={'/logo-full.svg'} alt="logo" width={140} height={40} />
    </div>
  )
}
