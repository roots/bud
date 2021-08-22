import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import clsx from 'clsx'
import React from 'react'

import styles from './HomepageFeatures.module.css'

const Sponsor = ({image, title, url}) => {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <a href={url} rel="sponsored">
          <img
            src={image}
            alt={title}
            style={{marginTop: '1rem', marginBottom: '1rem'}}
          />
        </a>
      </div>
    </div>
  )
}

const Sponsors = () => {
  const {siteConfig} = useDocusaurusContext()

  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {siteConfig.customFields.sponsors.map(
            (
              sponsor: {
                url: string
                image: string
                title: string
              },
              id: number,
            ) => (
              <Sponsor key={id} {...sponsor} />
            ),
          )}
        </div>
      </div>
    </section>
  )
}

export default Sponsors
