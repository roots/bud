import React from 'react'

export const Installation = ({pkg}) => (
  <>
    <h2>Installation</h2>
    <p>Install **{pkg}** to your project.</p>
    <code lang="shell">yarn add {pkg} --dev</code>
  </>
)
