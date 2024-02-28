import React, { useCallback, useContext, useState } from 'react'

import { ConfirmAction } from '@/components/widgets/deals/ui/ConfirmAction'

const CustomPromptContext = React.createContext<{
  requestPrompt: (msg: string) => Promise<unknown>
}>({ requestPrompt: async () => undefined })

export const CustomPromptProvider = ({
  children
}: {
  children: React.ReactNode
}) => {
  const [prompt, setPrompt] = useState<null | {
    message: string
    resolve: any
  }>(null)

  const requestPrompt = useCallback((message: string) => {
    return new Promise(resolve => {
      setPrompt({ message, resolve })
    })
  }, [])

  const handleClose = useCallback(
    (result: any) => {
      if (prompt) {
        prompt.resolve(result)
        setPrompt(null)
      }
    },
    [prompt]
  )

  return (
    <CustomPromptContext.Provider value={{ requestPrompt }}>
      {children}
      {prompt && (
        <ConfirmAction
          open={!!prompt.message}
          message={prompt.message}
          onClose={handleClose}
        />
      )}
    </CustomPromptContext.Provider>
  )
}

export function useCustomPrompt() {
  return useContext(CustomPromptContext)
}
