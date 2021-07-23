import React from 'react'

import {
  Banner,
  Community,
  Contributing,
  Sponsors,
} from '../components'

export const LibraryTemplate = ({
  title,
  description,
  project,
}) => (
  <>
    <Banner
      title={title ?? ''}
      description={description ?? ''}
      logo={project.logo ?? ''}
    />

    <h2>Installation</h2>

    <p>Install **{title}** to your project.</p>

    <code lang="shell">yarn add {title} --dev</code>

    <Community />
    <Contributing />
    <Sponsors project={project} />
  </>
)
