import prettier from 'prettier'

const pretty: Framework.Pretty = (contents, parser) => {
  return prettier.format(contents, parser ? {parser} : undefined)
}

export default pretty
