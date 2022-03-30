import Link from '@docusaurus/Link'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import Layout from '@theme/Layout'
import React from 'react'

import {Header} from '../../src/components/header'
import {Sponsors} from '../../src/components/sponsors'

const Home = () => {
  const {siteConfig} = useDocusaurusContext()

  return (
    <Layout>
      <Header.Component {...siteConfig}>
        <div className={Header.styles.buttons}>
          <Link
            className="button button--outline button--lg"
            to="/guides/"
          >
            Learn more
          </Link>

          <Link
            className="button button--outline button--lg"
            to="/guides/getting-started/"
          >
            Getting started
          </Link>
        </div>
      </Header.Component>

      <main>
        <Sponsors.Component />
      </main>
    </Layout>
  )
}

export default Home
