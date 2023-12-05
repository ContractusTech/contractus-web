import {
  HydrationBoundary,
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import dayjs from 'dayjs'
import { FC, ReactNode, useState } from 'react'

type Props = {
  dehydratedState: unknown
  children: ReactNode
}

export const ReactQueryProvider: FC<Props> = ({
  dehydratedState,
  children
}) => {
  const [queryClient] = useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: dayjs.duration(5, 'minutes').asMilliseconds()
        }
      }
    })
  )

  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={dehydratedState}>
        {children}
        <ReactQueryDevtools />
      </HydrationBoundary>
    </QueryClientProvider>
  )
}

export default ReactQueryProvider
