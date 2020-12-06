import {useEffect, useState} from 'react'
import gitRev from 'git-rev-sync'
import {watchFile} from 'fs-extra'
import globby from 'globby'

const init = {
  short: '',
  long: '',
  dirty: null,
  branch: '',
  unstaged: '',
  remote: '',
}

export const useGit = bud => {
  const [git, setGit] = useState(init)
  const [gitDir] = useState(bud.project('.git'))
  const [gitFiles, setGitFiles] = useState([])
  const [valid, setValid] = useState(false)

  useEffect(() => {
    gitDir &&
      (async () => {
        const paths = await globby([gitDir])
        setGitFiles(paths)
      })()
  }, [gitDir])

  useEffect(() => {
    const watcher = async () => {
      setValid(false)

      return true
    }

    gitFiles &&
      (async () => {
        await Promise.all(
          gitFiles.map(
            async file => await watchFile(file, watcher),
          ),
        )
      })()
  }, [gitFiles])

  useEffect(() => {
    !valid &&
      setGit({
        short: gitRev.short(),
        remote: gitRev.remoteUrl(),
        long: gitRev.long(),
        dirty: gitRev.isDirty(),
        branch: gitRev.branch(),
        unstaged: gitRev.hasUnstagedChanges(),
      })

    setValid(true)
  }, [valid])

  return {git, gitFiles, valid, gitDir}
}
