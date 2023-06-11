import Link from '@docusaurus/Link'
import clsx from 'clsx'
import React from 'react'

import styles from './index.module.css'

export const Mast = () => {
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
