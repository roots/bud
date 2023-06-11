import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import React from 'react'

import styles from './sponsors.module.css'

export const Sponsors = () => {
  const {
    siteConfig: {customFields: manifest},
  } = useDocusaurusContext()

  const {sponsors} = manifest as {
    sponsors: Array<{
      image: string
      title: string
      url: string
    }>
  }

  return (
    <div className={styles.section}>
      <h2>Sponsored by</h2>

      <div className={styles.sponsors}>
        {sponsors.map(({image, title, url}, id) => (
          <a className={styles.anchor} href={url} key={id} rel="sponsored">
            <img alt={title} className={styles.image} src={image} />
          </a>
        ))}
      </div>
    </div>
  )
}
