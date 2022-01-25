import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import Layout from '@theme/Layout'
import clsx from 'clsx'
import React from 'react'

import {Contributors} from '../src/components/contributors'
import {Header} from '../src/components/header'
import styles from './index.module.css'

function Page() {
  const {
    siteConfig: {customFields: manifest},
  } = useDocusaurusContext()

  return (
    <Layout
      title={`${manifest.name} Contributors`}
      description="Thanks to everyone who made this happen">
      <Header.Component title="Contributors" />

      <main>
        <section className={styles.features}>
          <Contributors.Component />
        </section>
      </main>
    </Layout>
  )
}

export default Page
