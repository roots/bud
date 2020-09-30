import prettier, {BuiltInParserName} from 'prettier'

type Formatter = (
  contents: string,
  parser: BuiltInParserName,
) => string

const pretty: Formatter = (contents, parser) => {
  return prettier.format(contents, parser ? {parser} : undefined)
}

export default pretty
