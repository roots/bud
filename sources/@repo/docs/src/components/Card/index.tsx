import Link from '@docusaurus/Link'
import React from 'react'
import {Fragment} from 'react'

export const Card = ({title, description, links}) => (
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
          <Fragment key={id}>
            <Link to={link[1]}>
              <button className="button button--secondary">
                {link[0]}
              </button>
            </Link>
          </Fragment>
        ))}
      </div>
    </div>
  </div>
)
