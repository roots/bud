// @ts-ignore
import Comparison from '@site/content/guides/comparison.mdx'
import clsx from 'clsx'
import React, {useEffect} from 'react'

import styles from './index.module.css'

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
