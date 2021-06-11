import React from 'react'
import clsx from 'clsx'
import styles from './HomepageFeatures.module.css'

const FeatureList = [
  {
    title: 'Easy to Use',
    description: (
      <>
        It's simple to get started with Bud. You don't need a
        single line of configuration to get going.
      </>
    ),
  },
  {
    title: "Anticipates what's next",
    description: (
      <>
        Bud lets you focus on your project, and we&apos;ll do the
        chores. Go ahead and move your docs into the{' '}
        <code>docs</code> directory.
      </>
    ),
  },
  {
    title: 'Infinitely hackable',
    description: (
      <>Extend or customize Bud with packaged extensions.</>
    ),
  },
]

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        {Svg && (
          <Svg className={styles.featureSvg} alt={title} />
        )}
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  )
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  )
}
