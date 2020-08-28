import prettier from 'prettier'

type Format = {
  [key: string]: Formatter
}

type Formatter = (any) => string

const json: Formatter = contents => {
  if (typeof contents == 'object') {
    contents = JSON.stringify(contents)
  }

  return prettier.format(contents, {parser: 'json'})
}

const format: Format = {
  json,
}

export {format, Format}
