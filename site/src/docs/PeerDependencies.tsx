import CodeBlock from '@theme/CodeBlock';
import TabItem from '@theme/TabItem';
import Tabs from '@theme/Tabs';
import React from 'react';

const PeerDependencies = () => (
  <div>
    <p>
      After installing the main package, run the{' '}
      <a href="/guides/bud-cli/">
        <code>bud init</code> command
      </a>{' '}
      to install required peer dependencies
    </p>

    <Tabs
      groupId="pacman"
      defaultValue="yarn"
      values={[
        { label: 'yarn', value: 'yarn' },
        { label: 'npm', value: 'npm' },
      ]}
    >
      <TabItem value="yarn">
        <CodeBlock className="language-shell">{`yarn bud init`}</CodeBlock>
      </TabItem>

      <TabItem value="npm">
        <CodeBlock className="language-shell">{`npm run bud init`}</CodeBlock>
      </TabItem>
    </Tabs>
  </div>
);

export { PeerDependencies };
