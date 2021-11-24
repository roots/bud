import React from 'react'

import * as Feature from './feature.component'
import data from './features.data.json'
import styles from './features.module.css'

export const Component = () => {
  const features = Object.entries(data)

  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          <div className="text--center">
            {features.map(([id, feature]) => (
              <Feature.Component key={id} {...feature} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export {styles}
