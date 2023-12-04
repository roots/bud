import CodeBlock from '@theme/CodeBlock'
import TabItem from '@theme/TabItem'
import Tabs from '@theme/Tabs'
import React from 'react'

export default function MultiLanguage({children, js, json, ts, yml}) {
  if (!children) return null

  const values = []

  children = Array.isArray(children) ? children : [children]

  children = children
    .filter(child => child?.props?.children?.props)
    .map(child => child.props.children.props)
    .map(child => {
      return {
        code: child.children,
        language: child.className
          .split(`language-`)
          .pop(),
        title: child.title,
      }
    })

  if (children.find(child => [`ts`, `tsx`].includes(child.language))) {
    values.push({label: `TS`, value: `ts`})
  }
  if (children.find(child => [`js`, `jsx`].includes(child.language))) {
    values.push({label: `JS`, value: `js`})
  }
  if (children.find(child => [`yml`].includes(child.language))) {
    values.push({label: `YML`, value: `yml`})
  }
  if (children.find(child => [`json`].includes(child.language))) {
    values.push({label: `JSON`, value: `json`})
  }

  return (
    <Tabs groupId="language" values={values}>
      {children.map((child, id) => {
        return (
          <TabItem key={id} value={child.language}>
            <CodeBlock
              language={child.language}
              showLineNumbers
              title={child.title}
            >
              {child.code}
            </CodeBlock>
          </TabItem>
        )
      })}
    </Tabs>
  )
}
