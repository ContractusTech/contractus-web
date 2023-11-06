import { SignMessage } from '@/components/features/wallet'

export default function Profile() {
  return (
    <>
      <section>
        <div className="mb-6 flex items-center justify-between px-15 py-13">
          <h1 className="typo-label">Profile</h1>
        </div>
        <div>
          <SignMessage />
        </div>
      </section>
    </>
  )
}
