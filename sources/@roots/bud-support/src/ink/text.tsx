import ansiRegex from 'ansi-regex'
import {Text, type TextProps} from 'ink'
import {Children, isValidElement, memo} from 'react'
// @ts-ignore
import ucr from 'unicoderegexp'

function stripAnsiControlCharacters(str: string) {
  return str.replace(ansiRegex(), str => (str.endsWith(`m`) ? str : ``))
}

function stripSpecialCharacters(str: string) {
  return str
    .split(``)
    .filter(
      c =>
        [`\u000A`, `\u000D`, `\u001b`].includes(c) ||
        ucr.visible.test(c) ||
        / /.test(c),
    )
    .join(``)
}

function normalizeString(str: string): string {
  return stripSpecialCharacters(stripAnsiControlCharacters(str))
}

function recursivelyNormalize(children: React.ReactNode): React.ReactNode {
  return Children.map(children, child => {
    if (typeof child === `string`) {
      return normalizeString(child)
    }
    if (
      isValidElement(child) &&
      (child.type === InkAnsiText || child.type === Text)
    ) {
      return {
        ...child,
        props: {
          ...child.props,
          children: recursivelyNormalize(child.props.children),
        },
        type: Text,
      }
    }
    if (Array.isArray(child)) {
      return recursivelyNormalize(child)
    }
    return child
  })
}

const InkAnsiText = memo(({children, ...otherProps}: TextProps) => {
  return <Text {...otherProps}>{recursivelyNormalize(children)}</Text>
})
InkAnsiText.displayName = `InkAnsiText`

export default InkAnsiText
