import { formatNumber } from '@/lib/utils'

export const Balance = ({ amount }: { amount: string }) => {
  return (
    <section className="mb-30">
      <div className="mb-13">
        <h1 className="typo-label text-center">Estimate balance</h1>
      </div>
      <h2 className="text-center text-6xl font-light leading-none">
        ${formatNumber(Number(amount))}
      </h2>
    </section>
  )
}
