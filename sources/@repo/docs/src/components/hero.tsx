import Link from '@docusaurus/Link'
import React from 'react'

export const Hero = ({button, subtitle, title}) => (
  <div className="hero hero--primary">
    <div className="container">
      <h1 className="hero__title">{title}</h1>
      {subtitle && <p className="hero__subtitle">{subtitle}</p>}
      {button && (
        <div>
          <Link to={button.href}>
            <button className="button button--secondary button--outline button--lg">
              {button.label}
            </button>
          </Link>
        </div>
      )}
    </div>
  </div>
)
