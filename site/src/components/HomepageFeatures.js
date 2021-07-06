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
        Bud lets you focus on your project but won't get in your
        way when it's sleeve rolling time.
      </>
    ),
  },
  {
    title: 'Infinitely hackable',
    description: (
      <>
        Extend Bud with extensions. Tap into hundreds of hooks to
        customize your build to your heart's content.
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
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          <div className="text--center">
            <a href="https://kinsta.com/?kaid=OFDHAJIXUDIV">
              <img
                src="https://cdn.roots.io/app/uploads/kinsta.svg"
                alt="Kinsta"
                style={{
                  marginRight: '4px',
                  marginLeft: '4px',
                  width: '18%',
                }}
              />
            </a>

            <a href="https://k-m.com/">
              <img
                src="https://cdn.roots.io/app/uploads/km-digital.svg"
                alt="KM Digital"
                style={{
                  marginRight: '4px',
                  marginLeft: '4px',
                  width: '18%',
                }}
              />
            </a>
            <a href="https://carrot.com/">
              <img
                src="https://cdn.roots.io/app/uploads/carrot.svg"
                alt="Carrot"
                style={{
                  marginRight: '4px',
                  marginLeft: '4px',
                  width: '18%',
                }}
              />
            </a>
            <a href="https://www.c21redwood.com/">
              <img
                src="https://cdn.roots.io/app/uploads/c21redwood.svg"
                alt="C21 Redwood Realty"
                style={{
                  marginRight: '4px',
                  marginLeft: '4px',
                  width: '18%',
                }}
              />
            </a>
            <a href="https://wordpress.com/">
              <img
                src="https://cdn.roots.io/app/uploads/wordpress.svg"
                alt="WordPress.com"
                style={{
                  marginRight: '4px',
                  marginLeft: '4px',
                  width: '18%',
                }}
              />
            </a>
            <a href="https://icons8.com/">
              <img
                src="https://cdn.roots.io/app/uploads/icons8.svg"
                alt="Icons8"
                style={{
                  marginRight: '4px',
                  marginLeft: '4px',
                  width: '18%',
                }}
              />
            </a>
            <a href="https://www.harnessup.com/">
              <img
                src="https://cdn.roots.io/app/uploads/harness-software.svg"
                alt="Harness Software"
                style={{
                  marginRight: '4px',
                  marginLeft: '4px',
                  width: '18%',
                }}
              />
            </a>
            <a href="https://www.codersclan.com/">
              <img
                src="https://cdn.roots.io/app/uploads/coders-clan.svg"
                alt="Coders Clan"
                style={{
                  marginRight: '4px',
                  marginLeft: '4px',
                  width: '18%',
                }}
              />
            </a>
            <a href="https://generodigital.com/">
              <img
                src="https://cdn.roots.io/app/uploads/genero.svg"
                alt="Genero"
                style={{
                  marginRight: '4px',
                  marginLeft: '4px',
                  width: '18%',
                }}
              />
            </a>
            <a href="https://motto.ca/roots">
              <img
                src="https://cdn.roots.io/app/uploads/motto.svg"
                alt="Motto"
                style={{
                  marginRight: '4px',
                  marginLeft: '4px',
                  width: '18%',
                }}
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
