/**
 * Patch globals
 */
import './patch'

/**
 * @roots/container
 */
import {Container} from '@roots/container'
export {Container}

/**
 * @roots/filesystem
 */
import {FileContainer, FileSystem} from '@roots/filesystem'
export {FileContainer, FileSystem}

/**
 * @roots/ink-use-styel
 */
import {useStyle} from '@roots/ink-use-style'
export {useStyle}

/**
 * Util: dump
 */
import {dump} from './util/dump'
export {dump}

/**
 * Util: killPort
 */
import {killPort} from './util/killPort'
export {killPort}

import {notify} from './util/notify'
export {notify}

/**
 * Util: WordPress packages
 */
export * as wpPkgs from './util/wordpressPkgs'

/**
 * Util: InterpolateHtmlPlugin
 */
import InterpolateHtmlPlugin from './util/InterpolateHtmlPlugin'
export {InterpolateHtmlPlugin}

/**
 * Webpack
 */
import webpack from 'webpack'
export {webpack}

import webpackDevMiddleware from 'webpack-dev-middleware'
export {webpackDevMiddleware}

import webpackHotMiddleware from 'webpack-hot-middleware'
export {webpackHotMiddleware}

import ProxyMiddleware, {
  createProxyMiddleware,
} from 'http-proxy-middleware'
export {ProxyMiddleware, createProxyMiddleware}

/**
 * Lodash
 */
import lodash, {
  isArray,
  isArrayLike,
  isObject,
  isObjectLike,
  isString,
  isFunction,
  isEqual,
  isNull,
  isUndefined,
  merge,
  get,
  set,
  has,
  join,
} from 'lodash'
export {
  lodash,
  isArray,
  isArrayLike,
  isObject,
  isObjectLike,
  isString,
  isFunction,
  isEqual,
  isNull,
  isUndefined,
  merge,
  get,
  set,
  has,
  join,
}

/**
 * React
 */
import React, {
  useEffect,
  useCallback,
  useLayoutEffect,
  useState,
} from 'react'
export {React, useEffect, useCallback, useLayoutEffect, useState}

/**
 * Ink
 */
export {
  Box,
  Spacer,
  Text,
  render,
  useApp,
  useInput,
  Static,
} from 'ink'

/**
 * Ink extensions
 */
import BigText from 'ink-big-text'
import Link from 'ink-link'
import Spinner from 'ink-spinner'
import Table from 'ink-table'
import Gradient from 'ink-gradient'
import useStdoutDimensions from 'ink-use-stdout-dimensions'
import patchConsole from 'patch-console'
export {
  BigText,
  Link,
  Spinner,
  Table,
  Gradient,
  useStdoutDimensions,
  patchConsole,
}

/**
 * React hooks/util.
 */
import useSWR, {mutate} from 'swr'
export {useSWR, useSWR as useSwr, mutate}

/**
 * axios
 */
import axios from 'axios'
export {axios}

/**
 * autobind-decorator
 */
import {boundMethod} from 'autobind-decorator'
export {boundMethod as bind}

/**
 * chalk
 */
import chalk from 'chalk'
export {chalk}

/**
 * chokidar
 */
import chokidar from 'chokidar'
export {chokidar}

/**
 * dotenv
 */
import dotenv from 'dotenv'
export {dotenv}

/**
 * execa
 */
import execa from 'execa'
export {execa}

/**
 * express
 */
import express from 'express'
export {express}

/**
 * fs
 */
import fs from 'fs-extra'
export {fs}

/**
 * globby
 */
import globby from 'globby'
export {globby}

/**
 * prettyFormat
 */
import prettyFormat from 'pretty-format'
export {prettyFormat}

/**
 * yargs
 */
import yargs from 'yargs'
export {yargs}

/**
 * Signale
 */
import {Signale, SignaleConfig, SignaleOptions} from 'signale'
export {Signale, SignaleConfig, SignaleOptions}
