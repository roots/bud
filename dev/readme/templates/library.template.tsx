import React from 'react'

import {
  Banner,
  Community,
  Contributing,
  Sponsors,
} from '../components'

export const Library = ({name, description, manifest}) => (
  <>
    <Banner
      name={name}
      description={description}
      logo={manifest.logo}
    />

    <h2>Installation</h2>

    <p>Install **{name}** to your project.</p>

    <code lang="shell">yarn add {name} --dev</code>

    <Community />
    <Contributing />
    <Sponsors {...manifest} />
  </>
)
