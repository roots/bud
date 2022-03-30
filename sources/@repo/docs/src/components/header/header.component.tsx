import clsx from 'clsx'
import React from 'react'

import styles from './header.module.css'

export interface Props {
  children?: React.ReactElement
  title?: string
  tagline?: string
}

export const Component = ({
  children,
  title = null,
  tagline = null,
}: Props) => {
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        {title && <h1 className="hero__title">{title}</h1>}

        {tagline && <p className="hero__subtitle">{tagline}</p>}

        {children ?? null}
      </div>
    </header>
  )
}

export {styles}
