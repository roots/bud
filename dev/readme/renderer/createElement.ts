import {File, Break, Markdown, Code, P, Span} from './components'

export function createElement(type, props?, root?) {
  const COMPONENTS = {
    ROOT: () => {
      return new Markdown(props)
    },
    File: () => {
      return new File(props)
    },
    code: () => {
      return new Code(props)
    },
    Fragment: () => {
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
        ? (props.children[0] = `## ${props.children.shift()}`)
        : `## ${props.children}`

      return new P({...props, children})
    },
    p: () => {
      return new P({...props})
    },
    span: () => {
      return new Span({...props})
    },
    default: () => {
      return new P(props)
    },
  }

  return COMPONENTS[type]() || COMPONENTS.default()
}
