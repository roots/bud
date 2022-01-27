import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import React from 'react'

import {styles} from '../features'
import * as Sponsor from './sponsor.component'

export const Component = () => {
  const {
    siteConfig: {customFields: manifest},
  } = useDocusaurusContext()

  const {sponsors} = manifest as {
    sponsors: Array<Sponsor.Props>
  }

  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {sponsors.map((sponsor, id) => (
            <Sponsor.Component key={id} {...sponsor} />
          ))}
        </div>
      </div>
    </section>
  )
}
