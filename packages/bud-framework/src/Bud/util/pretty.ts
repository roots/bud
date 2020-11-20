import prettier from 'prettier'

export const pretty: Pretty = (contents, parser) => {
  return prettier.format(contents, parser ? {parser} : undefined)
}

export type Pretty = (
  contents: string,
  parser: prettier.BuiltInParserName,
) => string
