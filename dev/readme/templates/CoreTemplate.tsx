import * as React from 'react'

import {
  Banner,
  Community,
  Contributing,
  Sponsors,
} from '../components'

export const CoreTemplate = ({title, description, project}) => (
  <>
    <Banner
      title={title ?? ''}
      description={description ?? ''}
      logo={project.logo ?? ''}
    />

    <h2>Installation</h2>
    <p>Install **{title}** to your project.</p>
    <code lang="shell">yarn add {title}</code>

    <h2>Documentation</h2>
    <p>
      For more information on utilizing this package [check out
      our dedicated docs]({project.url.docs})
    </p>

    <Community />
    <Contributing />
    <Sponsors project={project} />
  </>
)
