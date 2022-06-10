import {
  A,
  Break,
  Code,
  Em,
  File,
  Heading,
  Hr,
  Html,
  Image,
  Li,
  Markdown,
  Ol,
  P,
  Span,
  Strong,
} from './components/index.js'

export function createElement(type, props?, root?) {
  const COMPONENTS = {
    ROOT: () => {
      return new Markdown(props)
    },
    file: () => {
      return new File(props)
    },
    code: () => {
      return new Code(props)
    },
    br: () => {
      return new Break({...props})
    },
    hr: () => {
      return new Hr({...props})
    },
    h1: () => {
      return new Heading({...props, level: 1})
    },
    h2: () => {
      return new Heading({...props, level: 2})
    },
    h3: () => {
      return new Heading({...props, level: 3})
    },
    h4: () => {
      return new Heading({...props, level: 4})
    },
    p: () => {
      return new P({...props})
    },
    li: () => {
      return new Li({...props})
    },
    ol: () => {
      return new Ol({...props})
    },
    a: () => {
      return new A({...props})
    },
    em: () => {
      return new Em({...props})
    },
    strong: () => {
      return new Strong({...props})
    },
    span: () => {
      return new Span({...props})
    },
    img: () => {
      return new Image({...props})
    },
    h: () => {
      return new Html({...props})
    },
    fragment: () => {
      return new Span({...props})
    },
    ['']: () => {
      return '\n'
    },
    default: () => {
      return new Span({...props})
    },
  }

  return COMPONENTS[type] ? COMPONENTS[type]() : COMPONENTS.default()
}
