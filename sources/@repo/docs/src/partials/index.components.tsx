/* eslint-disable simple-import-sort/imports */

import Link from '@docusaurus/Link'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import React, {useEffect} from 'react'
import clsx from 'clsx'

import testimonials from '@site/static/data/testimonials.json'
import Testimonial from '@site/src/components/testimonial/component'
export {Sponsors} from '@site/src/components/sponsors'

// @ts-ignore
import Comparison from '@site/src/docs/comparison.mdx'

import styles from './index.module.css'

export const Mast = () => {
  // @ts-ignore
  const {siteConfig} = useDocusaurusContext()

  return (
    <header className={clsx(`hero hero--primary`, styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">
          Bud is a beautiful way to build your CSS and JS
        </h1>
        <h2 className="hero__subtitle">
          With support for Babel, React, PostCSS, CSS-in-JS, Sass,
          Typescript, esbuild, ESLint, Prettier, and more.
        </h2>

        <div className={styles.buttons}>
          <Link
            className="button button--outline button--lg"
            to="/guides/getting-started/"
          >
            Get started{`  `}→
          </Link>
        </div>
      </div>
    </header>
  )
}

export const Testimonials = () => {
  const testimonialColumns = [[], [], []]

  testimonials
    .filter(({showOnHomepage}) => showOnHomepage)
    .forEach((testimonial: any, i: number) =>
      testimonialColumns[i % 3].push(testimonial),
    )

  return (
    <div className={clsx(styles.section, styles.sectionAlt)}>
      <div className="container">
        <h2
          className={clsx(
            `margin-bottom--lg`,
            `text--center`,
            styles.featureHeading,
          )}
        >
          🎉 Success stories
        </h2>

        <div className={clsx(`row`, styles.testimonialsSection)}>
          {testimonialColumns.map((testimonials, i) => (
            <div className="col col--4" key={i}>
              {testimonials.map(testimony => (
                <Testimonial {...testimony} key={testimony.url} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export const Features = () => {
  useEffect(() => {
    document.querySelectorAll(`table td`).forEach(td => {
      if (td.textContent == `✅`) td.classList.add(styles.success)
      if (td.textContent == `❌`) td.classList.add(styles.error)
      if (td.textContent == `partial`) td.classList.add(styles.warning)
    })
  }, [])

  return (
    <div className={clsx(styles.section)}>
      <div className="container">
        <div className={styles.comparison}>
          <Comparison />
        </div>
      </div>
    </div>
  )
}
