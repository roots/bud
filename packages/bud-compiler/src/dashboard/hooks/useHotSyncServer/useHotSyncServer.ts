import {useState, useEffect} from 'react'
import browserSync from 'browser-sync'
import {makeMiddleware} from './makeMiddleware'

const useHotSyncServer = (bud: any): any[] => {
  const [hot] = useState(bud.features.enabled('hot'))
  const [target] = useState(bud.options.get('devServer.host'))
  const [open] = useState(bud.options.get('devServer.open'))
  const [files] = useState(bud.options.get('watch'))
  const [hotSyncServer, setHotSyncServer] = useState(null)
  const [devStats, setDevStats] = useState(null)

  useEffect(() => {
    if (!hotSyncServer && hot) {
      const options = {
        hot,
        proxy: {
          target,
          ws: true,
        },
        reload: false,
        reloadOnRestart: false,
        open,
        middleware: makeMiddleware(bud, setDevStats),
        injectChanges: true,
        injectFileTypes: bud.options
          .get('resolve.extensions')
          .map(ext => ext.replace('.', '')),
        watchOptions: {
          ignoreInitial: false,
        },
        files,
      }

      setHotSyncServer(browserSync.create().init(options))
    }
  }, [hotSyncServer, setHotSyncServer, hot, open, files, target])

  return [hotSyncServer, devStats]
}

export {useHotSyncServer}
