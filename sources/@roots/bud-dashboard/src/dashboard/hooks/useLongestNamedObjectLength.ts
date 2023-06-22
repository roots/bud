export const useLongestNamedObjectLength = (
  items: Array<{name?: string}> = [],
) => longestNamedObjectLength(items)

export const longestNamedObjectLength = (
  items: Array<{name?: string}> = [],
) =>
  items?.reduce((longest: number, item: {name?: string}) => {
    return Math.max(item?.name?.length, longest)
  }, 0) + 1
