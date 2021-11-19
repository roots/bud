import React from 'react'

import {
  Banner,
  Community,
  Contributing,
  Docs,
  Sponsors,
} from '../components'

export const CoreTemplate = ({title, description, project}) => (
  <>
    <Banner
      title={title ?? ''}
      description={description ?? ''}
      logo={project.logo ?? ''}
    />

    <span>{`## Installation

Install **${title}** to your project.
`}</span>

    <code lang="shell">yarn add {title}</code>

    <Docs url={project.url.docs} />

    <Community />
    <Contributing />
    <Sponsors project={project} />
  </>
)
