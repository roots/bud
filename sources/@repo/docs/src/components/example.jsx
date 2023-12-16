import CodeBlock from '@theme/CodeBlock'
import TabItem from '@theme/TabItem'
import Tabs from '@theme/Tabs'
import React from 'react'

export default function ExampleConfig({children}) {
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
        title: child.metastring.split(`=`).pop(),
      }
    })

  children.find(child => [`ts`, `tsx`].includes(child.language)) &&
    values.push({label: `TS`, value: `ts`})

  children.find(child => [`js`, `jsx`].includes(child.language)) &&
    values.push({label: `JS`, value: `js`})

  children.find(child => [`yml`].includes(child.language)) &&
    values.push({label: `YML`, value: `yml`})

  children.find(child => [`json`].includes(child.language)) &&
    values.push({label: `JSON`, value: `json`})

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
              title={child.title}
            >
              {child.language === `ts`
                ? `import type {Bud} from '@roots/bud'\n\nexport default async (bud: Bud) => {\n`
                : ``}
              {child.language === `js`
                ? `/** @param {import('@roots/bud').Bud} bud */\nexport default async (bud) => {\n`
                : ``}
              {[`js`, `ts`].includes(child.language)
                ? child.code
                    .split(`\n`)
                    .map((line, id) =>
                      id + 1 === child.code.split(`\n`).length
                        ? ``
                        : `  ${line}`,
                    )
                    .join(`\n`)
                : child.code}
              {[`js`, `ts`].includes(child.language) ? `}` : ``}
            </CodeBlock>
          </TabItem>
        )
      })}
    </Tabs>
  )
}
