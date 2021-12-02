import {
  A,
  Break,
  Code,
  Em,
  File,
  Image,
  Li,
  Markdown,
  Ol,
  P,
  S,
  Span,
  Strong,
} from './components'

export function createElement(type, props?, root?) {
  const COMPONENTS = {
    ROOT: () => {
      return new Markdown(props)
    },
    raw: () => {
      return new S(props)
    },
    file: () => {
      return new File(props)
    },
    code: () => {
      return new Code(props)
    },
    fragment: () => {
      return new P(props)
    },
    br: () => {
      return new Break()
    },
    h1: () => {
      const children = Array.isArray(props.children)
        ? (props.children[0] = `# ${props.children[0]}`)
        : `# ${props.children}`

      return new P({
        ...props,
        children,
      })
    },
    h2: () => {
      const children = Array.isArray(props.children)
        ? (props.children[0] = `## ${props.children.shift()}`)
        : `## ${props.children}`

      return new P({...props, children})
    },
    h3: () => {
      const children = Array.isArray(props.children)
        ? (props.children[0] = `### ${props.children.shift()}`)
        : `### ${props.children}`

      return new P({...props, children})
    },
    p: () => {
      return new P({...props})
    },
    li: () => {
      return new Li(props)
    },
    ol: () => {
      return new Ol(props)
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
    ['']: () => {
      return `${props.children}`
    },
    default: () => {
      return `${props.children}`
    },
  }

  return COMPONENTS[type]() || COMPONENTS.default()
}
