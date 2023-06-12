import CodeBlock from '@theme/CodeBlock'
import TabItem from '@theme/TabItem'
import Tabs from '@theme/Tabs'
import React from 'react'

export const Install = ({packages}: {packages: string}) => (
  <Tabs
    values={[
      {label: `yarn`, value: `yarn`},
      {label: `npm`, value: `npm`},
    ]}
    defaultValue="yarn"
    groupId="pacman"
  >
    <TabItem value="yarn">
      <CodeBlock className="language-shell">
        {`yarn add ${packages} --dev`}
      </CodeBlock>
    </TabItem>

    <TabItem value="npm">
      <CodeBlock className="language-shell">
        {`npm install ${packages} --save-dev`}
      </CodeBlock>
    </TabItem>
  </Tabs>
)
