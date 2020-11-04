import {useState} from 'react'

export const useProgress = (): [
  Hooks.Compilation.Progress,
  (percentage: number, msg: string) => void,
] => {
  const [progress, setProgress] = useState({
    percentage: {
      decimal: 0,
      display: `${0}%`,
    },
    msg: '',
  })

  const progressHandler = (
    percentage: number,
    msg: string,
  ): void => {
    if (typeof percentage !== 'number') return

    setProgress({
      percentage: {
        decimal: percentage,
        display: `${Math.floor(percentage * 100)}%`,
      },
      msg: msg ?? progress.msg,
    })
  }

  return [progress, progressHandler]
}

export default useProgress
