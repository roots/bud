import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import clsx from 'clsx'
import React from 'react'

import styles from './HomepageFeatures.module.css'

const FeatureList = [
  {
    title: 'Easy to Use',
    description: (
      <>
        It&apos;s simple to get started with Bud. You don&apos;t
        need a single line of configuration to get going.
      </>
    ),
  },
  {
    title: "Anticipates what's next",
    description: (
      <>
        Bud lets you focus on your project but won&apos;t get in
        your way when it&apos;s sleeve rolling time.
      </>
    ),
  },
  {
    title: 'Infinitely hackable',
    description: (
      <>
        Extend Bud with extensions. Tap into hundreds of hooks to
        customize your build to your heart&apos;s content.
      </>
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
  const {siteConfig} = useDocusaurusContext()

  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          <div className="text--center">
            {siteConfig.customFields.sponsors.map(
              (sponsor, id) => (
                <a key={id} href={sponsor.url}>
                  <img
                    src={sponsor.image}
                    alt={sponsor.title}
                    style={{
                      marginRight: '4px',
                      marginLeft: '4px',
                      width: '18%',
                    }}
                  />
                </a>
              ),
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
