import {useEffect, useState} from 'react'
import {watchFile} from 'fs-extra'
import execa from 'execa'
import globby from 'globby'

const params = {
  root: ['rev-parse', '--show-toplevel'],
  head: ['rev-parse', '--short', 'HEAD'],
  branch: ['branch', '--show-current'],
  dirty: ['diff', 'HEAD'],
  status: ['status', '--short'],
}

export const useGit = () => {
  const [dir, setDir] = useState(null)
  const [head, setHead] = useState(null)
  const [status, setStatus] = useState(null)
  const [branch, setBranch] = useState(null)
  const [dirty, setDirty] = useState(null)

  const [files, setFiles] = useState(null)
  const [err, setErr] = useState(false)
  const [valid, setValid] = useState(false)

  useEffect(() => {
    if (err || valid) {
      return
    }

    !dir &&
      (async () => {
        try {
          const {stdout: root} = await execa('git', params.root)
          setDir(root)
        } catch (err) {
          setErr(true)
        }
      })()
  }, [dir, err, valid])

  useEffect(() => {
    if (!dir || err) {
      return
    }

    const watch = async file =>
      await watchFile(file, async () => {
        setValid(false)
        return true
      })

    dir &&
      (async () => {
        const files = await globby([dir])
        await Promise.all(files.map(watch))
        setFiles(files)
      })()
  }, [dir])

  useEffect(() => {
    if (!files || err || valid) {
      return
    }

    ;(async () => {
      const {stdout: head} = await execa('git', params.head)
      setHead(head)

      const {stdout: branch} = await execa('git', params.branch)
      setBranch(branch)

      const {stdout: dirty} = await execa('git', params.dirty)
      setDirty(dirty)

      const {stdout: status} = await execa('git', params.status)
      setStatus(status)

      setValid(true)
    })()
  }, [files, err, valid])

  useEffect(() => {
    if (!err) {
      return
    }

    setHead(null)
    setBranch(null)
    setDirty(null)
    setStatus(null)
  }, [err])

  return {head, branch, dirty, status, dir, err}
}
