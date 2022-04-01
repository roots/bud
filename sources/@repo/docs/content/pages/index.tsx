/* eslint-disable simple-import-sort/imports */

import Link from '@docusaurus/Link'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import CodeBlock from '@theme/CodeBlock'
import Layout from '@theme/Layout'
import React from 'react'
import clsx from 'clsx'
import axios from 'axios'

import {Header} from '@site/src/components/header'
import {Sponsors} from '@site/src/components/sponsors'
import {Tweet} from '@site/src/components/tweet/component'

import tweets from '@site/static/data/tweets.json'

import styles from './styles.module.css'

const Mast = () => {
  const {siteConfig} = useDocusaurusContext()

  return (
    <Header.Component {...siteConfig}>
      <div className={Header.styles.buttons}>
        <Link className="button button--outline button--lg" to="/guides/">
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
  )
}

const Tweets = () => {
  const tweetColumns = [[], [], []]

  tweets
    .filter(tweet => tweet.showOnHomepage)
    .forEach((tweet, i) => tweetColumns[i % 3].push(tweet))

  return (
    <div className={clsx(styles.section, styles.sectionAlt)}>
      <div className="container">
        <h2
          className={clsx(
            'margin-bottom--lg',
            'text--center',
            styles.featureHeading,
          )}
        >
          🎉 Success stories
        </h2>

        <div className={clsx('row', styles.tweetsSection)}>
          {tweetColumns.map((tweetItems, i) => (
            <div className="col col--4" key={i}>
              {tweetItems.map(tweet => (
                <Tweet {...tweet} key={tweet.url} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const Home = () => {
  return (
    <Layout>
      <Mast />

      <Tweets />

      <main>
        <section className={clsx(styles.section)}>
          <div className="container">
            <div className="row">
              <div className="col col--6">
                <div className="col-demo">
                  <header>
                    <h2
                      className={clsx(
                        'margin-bottom--lg',
                        'text--left',
                        styles.featureHeading,
                      )}
                    >
                      🛼 Easy
                    </h2>
                  </header>
                </div>
              </div>
            </div>

            <div className="row" style={{marginTop: '2rem'}}>
              <div className="col col--6">
                <div className="col-demo">
                  <header>
                    <h2>Compile</h2>
                    <p>
                      Life finds a way. What do they got in there? King
                      Kong? You know what? It is beets. I&lquo;ve crashed
                      into a beet truck.
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
          </div>
        </section>
        <section className="container">
          <div className="row" style={{marginTop: '4rem'}}>
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
            <div className="col col--6">
              <div className="col-demo">
                <header>
                  <h2>Copy assets</h2>
                  <p>
                    Checkmate... Do you have any idea how long it takes
                    those cups to decompose. Hey, take a look at the
                    earthlings. Goodbye!{' '}
                  </p>
                </header>
              </div>
            </div>
          </div>
        </section>
        <section className="container">
          <div
            className="row"
            style={{marginTop: '4rem', marginBottom: '4rem'}}
          >
            <div className="col col--6">
              <div className="col-demo">
                <header>
                  <h2>Optimize</h2>
                  <p>
                    What do they got in there? King Kong? Remind me to
                    thank John for a lovely weekend. Eventually, you do
                    plan to have dinosaurs on your dinosaur tour, right?
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
        </section>

        <Sponsors.Component />
      </main>
    </Layout>
  )
}

export default Home
