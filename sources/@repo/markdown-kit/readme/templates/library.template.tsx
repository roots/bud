import React from 'react'

import {
  Banner,
  Community,
  Contributing,
  Sponsors,
} from '../components/index.js'

export const Library = ({name, description, projectConfig}) => (
  <>
    <Banner
      name={name}
      description={description}
      logo={projectConfig.logo}
    />

    <h2>Installation</h2>

    <p>Install **{name}** to your project.</p>

    <code lang="shell">yarn add {name} --dev</code>

    <Community />
    <Contributing />
    <Sponsors {...projectConfig} />
  </>
)
