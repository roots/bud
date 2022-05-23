import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import React from 'react'

import styles from './sponsors.module.css'

export const Component = () => {
  const {
    siteConfig: {customFields: manifest},
  } = useDocusaurusContext()

  const {sponsors} = manifest as {
    sponsors: Array<{
      url: string
      title: string
      image: string
    }>
  }

  return (
    <div className={styles.section}>
      <h2>Sponsored by</h2>

      <div className={styles.sponsors}>
        {sponsors.map(({url, image, title}, id) => (
          <a key={id} href={url} className={styles.anchor} rel="sponsored">
            <img src={image} alt={title} className={styles.image} />
          </a>
        ))}
      </div>
    </div>
  )
}
