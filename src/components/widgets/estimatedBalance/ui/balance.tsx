export const Balance = ({ amount }: { amount: string }) => {
  return (
    <section className="mb-30">
      <div className="mb-13">
        <h1 className="typo-label text-center">Estimate balance</h1>
      </div>
      <h2 className="text-center text-6xl font-light leading-none">
        ${Number(amount).toFixed(2)}
      </h2>
    </section>
  )
}
