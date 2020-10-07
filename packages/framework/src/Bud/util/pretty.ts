import prettier, {BuiltInParserName} from 'prettier'

export type Pretty = (
  contents: string,
  parser: BuiltInParserName,
) => string

const pretty: Pretty = (contents, parser) => {
  return prettier.format(contents, parser ? {parser} : undefined)
}

export default pretty
