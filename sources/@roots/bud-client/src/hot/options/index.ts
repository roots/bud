const defaultOptions: Options = {
  debug: true,
  indicator: true,
  log: true,
  name: `@roots/bud-client`,
  overlay: true,
  path: `/bud/hot`,
  reload: true,
  timeout: 2000,
}

/**
 * Set client data based on URL parameters
 */
const setFromParameters = (query: string): Options => {
  /**
   * Client options
   */
  const data: Partial<Options> = {...defaultOptions}

  new window.URLSearchParams(query).forEach((value: any, key: string) => {
    data[key as unknown as `${keyof Options & string}`] =
      value === `true` ? true : value === `false` ? false : value
  })

  return data
}

export {setFromParameters}
