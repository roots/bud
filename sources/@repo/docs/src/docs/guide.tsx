/* eslint-disable react/no-unescaped-entities */
import CodeBlock from '@theme/CodeBlock'
import clsx from 'clsx'
import React from 'react'

import styles from './guide.module.css'

export const Guide = () => {
  return (
    <section className={clsx(styles.section)}>
      <div className="container">
        <div
          className={clsx(`row`, `margin-bottom--lg`, `margin-top--lg`)}
        >
          <div className="col col--6">
            <div className="col-demo">
              <header>
                <h2
                  className={clsx(
                    `margin-bottom--lg`,
                    `text--left`,
                    styles.featureHeading,
                  )}
                >
                  🛼 Easy
                </h2>
              </header>
            </div>
          </div>
        </div>

        <div
          className={clsx(`row`, `margin-bottom--lg`, `margin-top--lg`)}
        >
          <div className="col col--6">
            <div className="col-demo">
              <header>
                <h2>Compile</h2>
                <p>
                  Life finds a way. What do they got in there? King Kong?
                  You know what? It is beets. I've crashed into a beet
                  truck.
                </p>
              </header>
            </div>
          </div>

          <div className="col col--6">
            <CodeBlock className="language-ts">
              {`\
  export default (app) => app.entry('app.js')
  `}
            </CodeBlock>
          </div>
        </div>

        <div className={clsx(`row`, `margin-top--lg`)}>
          <div className="col col--6">
            <div className="col-demo">
              <header>
                <h2>Copy assets</h2>

                <p>
                  Checkmate... Do you have any idea how long it takes those
                  cups to decompose. Hey, take a look at the earthlings.
                  Goodbye!{` `}
                </p>
              </header>
            </div>
          </div>
          <div className="col col--6">
            <CodeBlock className="language-ts">
              {`\
  export default (app) =>
    app
      .entry('app.js')
      .copy('assets/**/*.jpg')
  `}
            </CodeBlock>
          </div>
        </div>

        <div className={clsx(`row`, `margin-top--lg`)}>
          <div className="col col--6">
            <div className="col-demo">
              <header>
                <h2>Optimize</h2>
                <p>
                  What do they got in there? King Kong? Remind me to thank
                  John for a lovely weekend. Eventually, you do plan to
                  have dinosaurs on your dinosaur tour, right?
                </p>
              </header>
            </div>
          </div>

          <div className="col col--6">
            <CodeBlock className="language-ts">
              {`\
  export default (app) =>
    app
      .entry('app.js')
      .copy('assets/**/*.jpg')
      .minimize()
  `}
            </CodeBlock>
          </div>
        </div>
      </div>
    </section>
  )
}
