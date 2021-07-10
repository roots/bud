import React from 'react'
import {
  Banner,
  Community,
  Contributing,
  Docs,
  Installation,
  Sponsors,
} from './components'
import project from '../../repo'

export const MasterReadme = ({title, description, logo}) => (
  <>
    <Banner
      title={title ?? ''}
      description={description ?? ''}
      logo={logo ?? ''}
    />
    <Installation pkg={title} />
    <Docs url={project.links.site} />
    <Community />
    <Contributing />
    <Sponsors />
  </>
)
