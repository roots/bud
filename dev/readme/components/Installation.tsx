import React from 'react'

export const Installation = ({pkg}) => (
  <>
    <h2>Installation</h2>

    <p>Install **{pkg}** to your project.</p>

    <code lang="shell">yarn add {pkg} --dev</code>

    <p>
      When installing an extension remember to run `bud init`
      after installation to ensure peer dependencies are correct.
    </p>
  </>
)
