import {useState} from '@roots/bud-support'
import {Dashboard} from '@roots/bud-framework'

const INITIAL_STATE: Dashboard.UseProgress.State = {
  percentage: {
    decimal: 0,
    display: `${0}%`,
  },
  msg: '',
}

const useProgress: Dashboard.UseProgress = () => {
  const [
    state,
    setState,
  ] = useState<Dashboard.UseProgress.State>(INITIAL_STATE)

  const handler: Dashboard.UseProgress.Handler = (
    percentage,
    msg,
  ) => {
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

export {useProgress}
