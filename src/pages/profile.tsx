import { NextPageWithLayout } from '@/app/types'
import LayoutDefault from '@/layouts/default'

const ProfilePage: NextPageWithLayout = () => {
  return (
    <>
      <section>
        <div className="mb-6 flex items-center justify-between px-15 py-13">
          <h1 className="typo-label">Profile</h1>
        </div>
      </section>
    </>
  )
}

ProfilePage.getLayout = page => {
  return <LayoutDefault>{page}</LayoutDefault>
}

export default ProfilePage
