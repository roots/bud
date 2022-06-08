import {projectConfig} from '@repo/constants'
import React from 'react'

import {
  Banner,
  Community,
  Contributing,
  Docs,
  Sponsors,
} from '../components/index.js'

export const Extension = ({
  name,
  description,
  projectConfig,
}: {
  name: string
  description: string
  projectConfig: projectConfig
}) => (
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
