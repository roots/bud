import {useEffect, useState} from 'react'
import gitRev from 'git-rev-sync'

import {useDisk} from './useDisk'

const init = {
  short: '',
  long: '',
  dirty: null,
  branch: '',
  unstaged: '',
  remote: '',
}

export const useGit = bud => {
  const [disk] = useDisk(bud)
  const [git, setGit] = useState(init)

  useEffect(() => {
    setGit({
      short: gitRev.short(),
      remote: gitRev.remoteUrl(),
      long: gitRev.long(),
      dirty: gitRev.isDirty(),
      branch: gitRev.branch(),
      unstaged: gitRev.hasUnstagedChanges(),
    })
  }, [bud, disk?.fs])

  return git
}
