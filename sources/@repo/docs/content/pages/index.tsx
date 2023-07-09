import Link from '@docusaurus/Link'
import styles from '@site/src/components/mast/index.module.css'
import {Sponsors} from '@site/src/components/sponsors'
import Layout from '@theme/Layout'
import clsx from 'clsx'
import React from 'react'

const Home = () => {
  return (
    <Layout>
      <header className={clsx(`hero`, styles.heroBanner)}>
        <div className="container">
          <h1 className="hero__title">
            Configurable, extensible build tools for modern single and
            multi-page web applications
          </h1>

          <div className={styles.buttons}>
            <Link
              className="button button--outline button--lg"
              to="/learn/getting-started"
            >
              Get started{`  `}→
            </Link>

            <Link
              className="button button--outline button--lg"
              to="/reference/bud.after"
            >
              API reference{`  `}→
            </Link>
          </div>
        </div>
      </header>

      <Sponsors />
    </Layout>
  )
}

export default Home
