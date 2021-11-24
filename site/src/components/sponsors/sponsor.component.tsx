import clsx from 'clsx'
import React from 'react'

export interface Props {
  image: string
  title: string
  url: string
}

const imageStyle = {marginTop: '1rem', marginBottom: '1rem'}

export const Component = ({image, title, url}: Props) => {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <a href={url}>
          <img src={image} alt={title} style={imageStyle} />
        </a>
      </div>
    </div>
  )
}
