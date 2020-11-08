import {useState} from 'react'

const INITIAL_STATE: UseProgress.Progress = {
  percentage: {
    decimal: 0,
    display: `${0}%`,
  },
  msg: '',
}

const useProgress: UseProgress.Hook = () => {
  const [state, setState] = useState(INITIAL_STATE)

  const handler: UseProgress.Handler = (percentage, msg) => {
    if (typeof percentage !== 'number') return

    setState({
      percentage: {
        decimal: percentage,
        display: `${Math.floor(percentage * 100)}%`,
      },
      msg: msg ?? state.msg,
    })
  }

  return [state, handler]
}

export namespace UseProgress {
  /**
   * UseProgress
   */
  export interface Hook {
    (): HookInterface
  }

  export type HookInterface = [Progress, Handler]

  /**
   * Process webpack progress Return.
   */
  export type Handler = (percentage: number, msg: string) => void

  /**
   * Compiler progress
   */
  export type Progress = {
    percentage: Percentage
    msg: string
  }

  /**
   * Percentage as a nicely formatted display string
   * and a decimal number for rendering, etc.
   */
  export interface Percentage {
    display: string
    decimal: number
  }
}

export {useProgress}
