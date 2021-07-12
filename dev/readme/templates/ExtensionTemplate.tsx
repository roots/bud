import React from 'react'
import {
  Banner,
  Community,
  Contributing,
  Sponsors,
} from '../components'
import project from '../../../repo'

export const ExtensionTemplate = ({
  title,
  description,
  logo,
}) => (
  <>
    <Banner
      title={title ?? ''}
      description={description ?? ''}
      logo={logo ?? ''}
    />

    <h2>Installation</h2>

    <p>Install **{title}** to your project.</p>

    <code lang="shell">yarn add {title} --dev</code>
    <p>
      Run `bud init` after installation to ensure peer
      dependencies are met.
    </p>
    <code lang="shell">yarn bud init</code>

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
