import prettier, {BuiltInParserName} from 'prettier'

type Format = {
  [key: string]: Formatter
}

type Formatter = (any, parser: BuiltInParserName) => string

const format: Formatter = (contents, parser) => {
  return prettier.format(contents, parser ? {parser} : undefined)
}

export {format as default}
