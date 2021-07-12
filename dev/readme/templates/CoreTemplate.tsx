import React from 'react'
import {
  Banner,
  Community,
  Contributing,
  Sponsors,
} from '../components'
import project from '../../../repo'

export const CoreTemplate = ({title, description, logo}) => (
  <>
    <Banner
      title={title ?? ''}
      description={description ?? ''}
      logo={logo ?? ''}
    />

    <h2>Installation</h2>
    <p>Install **{title}** to your project.</p>
    <code lang="shell">yarn add {title}</code>

    <h2>Documentation</h2>
    <p>
      For more information on utilizing this package [check out
      our dedicated docs]({project.links.site})
    </p>

    <Community />
    <Contributing />
    <Sponsors />
  </>
)
