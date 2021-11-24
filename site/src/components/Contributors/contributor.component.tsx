import React, {useEffect, useState} from 'react'

import * as Icon from '../icon'
import styles from './style.module.css'

export const Component = ({id}) => {
  const [user, setUser] = useState<any>(null)
  useEffect(() => {
    !user &&
      fetch(`/data/contributors/${id}.json`).then(async res => {
        const data = await res.json()
        data && setUser(data)
      })
  }, [id, user, setUser])

  return !user ? null : (
    <>
      <div className="text--center">
        <img className={styles.avatar} src={user.avatar_url} />
      </div>

      <div className="text--center padding-horiz--md padding-vert--sm">
        <h3 className={styles.username}>
          {user.name ?? user.login}
          <a href={user.url}>
            <Icon.ExternalLink />
          </a>
        </h3>
      </div>
    </>
  )
}
