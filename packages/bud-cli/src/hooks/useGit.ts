import {useEffect, useState} from 'react'
import {watchFile} from 'fs-extra'
import execa from 'execa'

const params = {
  root: ['rev-parse', '--show-toplevel'],
  files: ['ls-tree', '--full-tree', '-r', '--name-only', 'HEAD'],
  head: ['rev-parse', '--short', 'HEAD'],
  branch: ['branch', '--show-current'],
  dirty: ['diff', 'HEAD'],
  status: ['status', '--short'],
}

export type GitStatus = {
  head: string
  branch: string
  dirty: string
  status: string
  err: boolean
}

export type UseGit = () => GitStatus

export const useGit: UseGit = () => {
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

    ;(async () => {
      try {
        const {stdout: files} = await execa('git', params.files)
        setFiles(files.split('\n'))
      } catch (err) {
        setErr(true)
      }
    })()
  }, [files, err, valid])

  useEffect(() => {
    if (!files || err) {
      return
    }

    const watch = async file =>
      await watchFile(file, async () => {
        setValid(false)
        return true
      })

    ;(async () => {
      await Promise.all(files.map(watch))
    })()
  }, [files])

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

  return {head, branch, dirty, status, err}
}
