import React from 'react'

import {
  Banner,
  Community,
  Contributing,
  Docs,
  Sponsors,
} from '../components'

export const Core = ({name, description, manifest}) => (
  <>
    <Banner
      name={name}
      description={description}
      logo={manifest.logo}
    />

    <h2>Installation</h2>

    <p>Install **{name}** to your project.</p>

    <code lang="shell">yarn add {name} --dev</code>

    <Docs url={manifest.url.docs} />

    <Community />
    <Contributing />
    <Sponsors {...manifest} />
  </>
)
