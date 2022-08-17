import clsx from 'clsx'
import React from 'react'

export interface Props {
  title: string
  description: string
}

export const Component = ({title, description}: Props) => {
  return (
    <div className={clsx(`col col--4`)}>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  )
}
