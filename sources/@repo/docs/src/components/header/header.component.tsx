import clsx from 'clsx'
import React from 'react'

import styles from './header.module.css'

export interface Props {
  children?: React.ReactElement
  title?: string
  tagline?: string
  Above?: any
}

export const Component = ({
  children,
  title = null,
  tagline = null,
  Above = () => null,
}: Props) => {
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <Above />
      <div className="container">
        {title && <h1 className="hero__title">{title}</h1>}

        {tagline && <p className="hero__subtitle">{tagline}</p>}

        {children ?? null}
      </div>
    </header>
  )
}

export {styles}
