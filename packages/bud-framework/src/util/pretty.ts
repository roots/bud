import prettier, {BuiltInParserName} from 'prettier'

type Formatter = (any, parser: BuiltInParserName) => string

const pretty: Formatter = (contents, parser) => {
  return prettier.format(contents, parser ? {parser} : undefined)
}

export {pretty as default}
