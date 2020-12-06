import {useEffect, useState} from 'react'
import gitRev from 'git-rev-sync'

const init = {
  short: '',
  long: '',
  dirty: null,
  branch: '',
  unstaged: '',
  remote: '',
}

export const useGit = () => {
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
  }, [])

  return git
}
