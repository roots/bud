import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import clsx from 'clsx'
import React from 'react'

import * as Contributor from './contributor.component'

export const Component = () => {
  const {
    siteConfig: {customFields: manifest},
  } = useDocusaurusContext()

  return (
    <div className="container">
      <div className="row">
        {Object.entries(manifest.contributors).map(
          ([user, info], id) => (
            <div key={id} className={clsx(`col col--3`)}>
              <Contributor.Component id={user} {...info} />
            </div>
          ),
        )}
      </div>
    </div>
  )
}
