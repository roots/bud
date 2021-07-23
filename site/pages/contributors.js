/* eslint-disable import/no-unresolved */
import Link from '@docusaurus/Link'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import Layout from '@theme/Layout'
import clsx from 'clsx'
import React, {useEffect, useState} from 'react'

import styles from './index.module.css'

function Header() {
  return (
    <header
      className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">Contributors</h1>
      </div>
    </header>
  )
}

function Contributor({id, type}) {
  const [user, setUser] = useState({type})

  useEffect(() => {
    const fetchUser = async () => {
      const {res} = await fetch(
        `https://api.github.com/users/${id}`,
      )

      res && setUser({...user, ...res.json()})
    }

    fetchUser(id)
  }, [id, user])

  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <img src={user.avatar_url} />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{user.name}</h3>
        <p>{user.bio}</p>
      </div>
    </div>
  )
}

export default function Home() {
  const {
    siteConfig: {customFields: manifest},
  } = useDocusaurusContext()

  return (
    <Layout
      title={`${manifest.name} Contributors`}
      description="Thanks to everyone who made this happen">
      <Header />
      <main>
        <section className={styles.features}>
          <div className="container">
            <div className="row">
              {Object.entries(manifest.contributors).map(
                ([user, info], id) => (
                  <Contributor key={id} id={user} {...info} />
                ),
              )}
            </div>
          </div>
        </section>
      </main>
    </Layout>
  )
}
