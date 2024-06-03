import CodeBlock from '@theme/CodeBlock'
import TabItem from '@theme/TabItem'
import Tabs from '@theme/Tabs'
import React from 'react'

function Example({children, config = true, title}) {
  if (!children) return null

  const values = []

  children = Array.isArray(children) ? children : [children]

  children = children
    .filter(child => child?.props?.children?.props)
    .map(child => child.props.children.props)
    .map(child => {
      return {
        ...child,
        code: child.children,
        language: child.className.split(`language-`).pop(),
        title: child.title ?? null,
      }
    })

  children.forEach(child =>
    values.push({
      label: child.language.toUpperCase(),
      value: child.language,
    }),
  )

  return (
    <Tabs groupId="language" values={values}>
      {children.map((child, id) => {
        return (
          <TabItem key={id} value={child.language}>
            <CodeBlock
              className={child.className}
              language={child.language}
              metastring={child.metastring}
              showLineNumbers
              title={child.title ?? `${title}.${child.language}`}
            >
              {config && child.language === `ts`
                ? `import type {Bud} from '@roots/bud'\n\nexport default async (bud: Bud) => {\n`
                : ``}

              {config && child.language === `js`
                ? `/** @param {import('@roots/bud').Bud} bud */\nexport default async (bud) => {\n`
                : ``}

              {[`js`, `ts`, `tsx`].includes(child.language)
                ? child.code
                    .split(`\n`)
                    .map((line, id) =>
                      id + 1 === child.code.split(`\n`).length
                        ? ``
                        : `  ${line}`,
                    )
                    .join(`\n`)
                : child.code}
              {config && [`js`, `ts`, `tsx`].includes(child.language)
                ? `}`
                : ``}
            </CodeBlock>
          </TabItem>
        )
      })}
    </Tabs>
  )
}

export default Example
