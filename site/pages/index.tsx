import Link from '@docusaurus/Link'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import Layout from '@theme/Layout'
import clsx from 'clsx'
import React from 'react'

import Sponsors from '../src/components/Sponsors'
import styles from './index.module.css'

function Header() {
  const {siteConfig} = useDocusaurusContext()
  return (
    <header
      className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--outline button--lg"
            to="/guides/">
            Learn more
          </Link>

          <Link
            className="button button--outline button--lg"
            to="/guides/getting-started/">
            Getting started
          </Link>
        </div>
      </div>
    </header>
  )
}

export default function Home() {
  return (
    <Layout title={`Bud`} description="Frontend build tools">
      <Header />

      <main>
        <Sponsors />
      </main>
    </Layout>
  )
}
