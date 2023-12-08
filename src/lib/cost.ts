const _separateThousands = (numberString: string) => {
  // eslint-disable-next-line unicorn/prefer-string-replace-all
  const withTrailingZeros = numberString.replace(/\d(?=(\d{3})+\.)/g, '$& ')
  // const _withoutTrailingZeros = withTrailingZeros.replace(/\.00$/, '')
  return withTrailingZeros
}

export const separateThousands = (number: number) => {
  return number ? _separateThousands(number.toFixed(2)) : '0'
}

export const formatDollars = (number?: number) => {
  return `$${separateThousands(number || 0)}`
}
