export const useLongestNamedObjectLength = (
  items: Array<{name?: string}> = [],
) => longestNamedObjectLength(items)

export const longestNamedObjectLength = (
  items: Array<{name?: string}> = [],
) =>
  items?.reduce((longest: number, item: {name?: string}) => {
    const length = item?.name?.length
    if (!length) return longest
    return Math.max(length, longest)
  }, 0) + 1
