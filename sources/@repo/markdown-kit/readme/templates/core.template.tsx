import React from 'react'

import {
  Banner,
  Community,
  Contributing,
  Docs,
  Sponsors,
} from '../components/index.js'

export const Core = ({name, description, projectConfig}) => (
  <>
    <Banner
      name={name}
      description={description}
      logo={projectConfig.logo}
    />

    <h2>Installation</h2>

    <p>Install **{name}** to your project.</p>

    <code lang="shell">yarn add {name} --dev</code>

    <Docs url={projectConfig.url.docs} />

    <Community />

    <Contributing />

    <Sponsors {...projectConfig} />
  </>
)
