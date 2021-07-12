import React from 'react'
import {
  Banner,
  Community,
  Contributing,
  Sponsors,
} from '../components'

export const LibraryTemplate = ({title, description, logo}) => (
  <>
    <Banner
      title={title ?? ''}
      description={description ?? ''}
      logo={logo ?? ''}
    />

    <h2>Installation</h2>

    <p>Install **{title}** to your project.</p>

    <code lang="shell">yarn add {title} --dev</code>

    <Community />
    <Contributing />
    <Sponsors />
  </>
)
