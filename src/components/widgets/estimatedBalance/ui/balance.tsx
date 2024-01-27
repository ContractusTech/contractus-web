import { useBalance } from '@/api/modules/accounts/hooks/useBalance'

export const Balance = () => {
  const { balance } = useBalance({ currency: 'USD' })

  return (
    <section className="mb-30">
      <div className="mb-13">
        <h1 className="typo-label text-center">Estimate balance</h1>
      </div>
      <h2 className="text-center text-6xl font-light leading-none">
        {/* ${balance?.estimateAmount} */}
      </h2>
    </section>
  )
}
