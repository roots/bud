export const checkModeIsValid = (
  mode: string,
): boolean | undefined => {
  if (
    mode !== 'production' &&
    mode !== 'development' &&
    mode !== 'none'
  ) {
    console.error(
      'Mode must be one of: production, development, none',
    )

    process.exit(1)
  }

  return true
}
