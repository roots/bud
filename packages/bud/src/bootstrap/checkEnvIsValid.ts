const checkEnvIsValid = (env: string): boolean | undefined => {
  if (
    env !== 'production' &&
    env !== 'development' &&
    env !== 'none'
  ) {
    console.error(
      'Env must be one of: production, development, none',
    )

    process.exit(1)
  }

  return true
}

export {checkEnvIsValid as default}
