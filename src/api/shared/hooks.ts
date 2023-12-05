import { cloneDeep, merge } from 'lodash-es'
import { useMutation, useQueryClient } from 'react-query'

export type UseCreateMutationParams<T> = {
  itemsQueryKey: string | unknown[]
  mutationFn: (createDto: T) => any | Promise<any>
  addItemFn?: (items: T[], createDto: T) => T[]
  prepend?: boolean
  invalidateOnSettled?: boolean
  updateAfterSuccess?: boolean
  onSuccess?: (item: T, updateDto: T) => any | Promise<any>
}

export type UseUpdateMutationParams<T, TDto> = {
  itemsQueryKey: string | unknown[]
  mutationFn: (updateDto: TDto) => any | Promise<any>
  equalsToTargetItemFn: (item: T, dto: TDto) => boolean
  invalidateOnSettled?: boolean
  cacheItemUpdateFn?: (item: T, updateDto: TDto) => any | Promise<any>
  onSuccess?: (item: T, updateDto: TDto) => any | Promise<any>
}

export type UseDeleteMutationParams<T, TDto> = UseUpdateMutationParams<
  T,
  TDto
> & {
  invalidateOnSettled?: boolean
  onSuccess?: () => void
}

export const useCreateMutation = <T>({
  itemsQueryKey,
  mutationFn,
  addItemFn,
  prepend,
  invalidateOnSettled = true,
  updateAfterSuccess = false,
  onSuccess
}: UseCreateMutationParams<T>) => {
  const queryClient = useQueryClient()

  const optimisticUpdate = (createDto: T) => {
    const cachedItemsCopy =
      (cloneDeep(queryClient.getQueryData(itemsQueryKey)) as T[]) || []

    let updatedItems: T[]

    if (prepend) {
      updatedItems = [createDto, ...cachedItemsCopy]
    } else if (addItemFn) {
      updatedItems = addItemFn(cachedItemsCopy, createDto)
    } else {
      updatedItems = [...cachedItemsCopy, createDto]
    }

    queryClient.setQueryData(itemsQueryKey, updatedItems)
  }

  return useMutation(mutationFn, {
    onMutate: (createDto: T) => {
      if (!updateAfterSuccess) {
        optimisticUpdate(createDto)
      }
    },
    onSuccess: (createDto: T, t: T) => {
      if (updateAfterSuccess) {
        optimisticUpdate(createDto)
      }
      onSuccess?.(createDto, t)
    },
    onSettled: () => {
      if (invalidateOnSettled) {
        queryClient.invalidateQueries(itemsQueryKey)
      }
    }
  })
}

export const useUpdateMutation = <T, TDto>({
  itemsQueryKey,
  mutationFn,
  equalsToTargetItemFn,
  invalidateOnSettled = true,
  cacheItemUpdateFn,
  onSuccess
}: UseUpdateMutationParams<T, TDto>) => {
  const queryClient = useQueryClient()

  return useMutation(mutationFn, {
    onMutate: async (updateDto: TDto) => {
      const cachedItems = (queryClient.getQueryData(itemsQueryKey) as T[]) || []
      const cachedItemsCopy = cloneDeep(cachedItems)
      const index = cachedItemsCopy.findIndex(item =>
        equalsToTargetItemFn(item, updateDto)
      )

      if (index !== -1) {
        cachedItemsCopy[index] =
          cacheItemUpdateFn?.(cachedItemsCopy[index], updateDto) ??
          merge(cachedItemsCopy[index], updateDto)
        queryClient.setQueryData(itemsQueryKey, cachedItemsCopy)
      }

      return () => queryClient.setQueryData(itemsQueryKey, cachedItems)
    },
    onSettled: () => {
      if (invalidateOnSettled) {
        queryClient.invalidateQueries(itemsQueryKey)
      }
    },
    onSuccess
  })
}

export const useDeleteMutation = <T, TDto>({
  equalsToTargetItemFn,
  itemsQueryKey,
  mutationFn,
  invalidateOnSettled = true
}: UseDeleteMutationParams<T, TDto>) => {
  const queryClient = useQueryClient()

  return useMutation(mutationFn, {
    onMutate: async (dto: TDto) => {
      const cachedItems = (queryClient.getQueryData(itemsQueryKey) as T[]) || []
      const updatedItems = cachedItems.filter(
        item => !equalsToTargetItemFn(item, dto)
      )
      queryClient.setQueryData(itemsQueryKey, updatedItems)
      return () => queryClient.setQueryData(itemsQueryKey, cachedItems)
    },
    onSettled: () => {
      if (invalidateOnSettled) {
        queryClient.invalidateQueries(itemsQueryKey)
      }
    }
  })
}
