import {useState, useCallback, useEffect} from 'react'
import http from 'http'
import {throttle} from 'lodash'

const useHmr = () => {
  const [data, setData] = useState([])
  const [error, setError] = useState([])

  throttle(function () {
    http
      .get('http://localhost:3000/__webpack_hmr', resp => {
        let reqData

        resp.on('data', chunk => {
          reqData = reqData + chunk
        })

        resp.on('end', () => {
          setData([...data, reqData.data])
        })
      })
      .on('error', err => {
        setError([...error, err.message])
      })
  }, 1000)

  return [data, error]
}

export {useHmr as default}
