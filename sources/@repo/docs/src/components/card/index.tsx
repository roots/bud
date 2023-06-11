import Link from '@docusaurus/Link'
import React from 'react'

export const Card = ({description, links, title}) => (
  <div className="card">
    <div className="card__header">
      <h3>{title}</h3>
    </div>

    <div className="card__body">
      <p>{description}</p>
    </div>

    <div className="card__footer">
      <div className="button-group button-group--block">
        {links.map((link, id) => (
          <button
            className="button button--secondary"
            key={id}
            onClick={() => (window.location = link[1])}
          >
            <Link to={link[1]}>{link[0]}</Link>
          </button>
        ))}
      </div>
    </div>
  </div>
)
