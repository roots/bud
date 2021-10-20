import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import Layout from '@theme/Layout'
import clsx from 'clsx'
import React from 'react'

import {Contributors} from '../src/components/Contributors'
import styles from './index.module.css'

function Header() {
  return (
    <header
      className={clsx('hero hero--primary', styles.heroBanner)}
    >
      <div className="container">
        <h1 className="hero__title">Contributors</h1>
      </div>
    </header>
  )
}

function Page() {
  const {
    siteConfig: {customFields: manifest},
  } = useDocusaurusContext()

  return (
    <Layout
      title={`${manifest.name} Contributors`}
      description="Thanks to everyone who made this happen"
    >
      <Header />

      <main>
        <section className={styles.features}>
          <Contributors />
        </section>
      </main>
    </Layout>
  )
}

export default Page
