import {useEffect, useState} from 'react'
import {watchFile} from 'fs-extra'
import execa from 'execa'
import globby from 'globby'

const params = {
  root: ['rev-parse', '--show-toplevel'],
  head: ['rev-parse', '--short', 'HEAD'],
  branch: ['rev-parse', '--abbrev-rev', 'HEAD'],
  dirty: ['diff', 'HEAD'],
  status: ['status', '--short'],
}

export const useGit = () => {
  const [git, setGit] = useState(null)
  const [dir, setDir] = useState(null)
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
      await Promise.all(
        Object.entries(params).map(async ([key, params]) => {
          const {stdout} = await execa('git', params)
          if (key == 'dirty') {
            setGit({
              ...git,
              [key]: stdout == '' ? false : true,
            })
          } else {
            setGit({
              ...git,
              [key]: stdout,
            })
          }
        }),
      )

      setValid(true)
    })()
  }, [files, err, valid])

  useEffect(() => {
    err && setGit(null)
  }, [err])

  return {...git}
}
