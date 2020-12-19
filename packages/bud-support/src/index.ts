/**
 * Data handling.
 */
import lodash, {
  isArray,
  isArrayLike,
  isObject,
  isObjectLike,
  isString,
  isFunction,
  isEqual,
  get,
  set,
  merge,
} from 'lodash'
import fs from 'fs-extra'
import globby, {GlobTask, GlobbyOptions} from 'globby'
import yargs from 'yargs'
import execa from 'execa'
import React, {
  useEffect,
  useCallback,
  useLayoutEffect,
  useState,
  ComponentState,
  FunctionComponent,
  ReactElement,
} from 'react'
import {
  Box,
  Instance,
  Spacer,
  Text,
  render,
  useApp,
  useInput,
} from 'ink'
import {Props as BoxProps} from 'ink/build/components/Box'
import patchConsole from 'patch-console'
import Link from 'ink-link'
import Spinner from 'ink-spinner'
import Table from 'ink-table'
import Gradient from 'ink-gradient'
import useStdoutDimensions from 'ink-use-stdout-dimensions'
import webpack, {Stats} from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import proxyMiddleware from 'http-proxy-middleware'
import express from 'express'

import prettier from 'prettier'
import zlib from 'zlib'
import useSwr, {mutate} from 'swr'

export {
  /**
   * Execa
   */
  execa,
  /**
   * FS Extra
   */
  fs,
  /**
   * Globby
   */
  globby,
  GlobTask,
  GlobbyOptions,
  /**
   * Prettier
   */
  prettier,
  /**
   * Yargs
   */
  yargs,
  /**
   * Lodash
   */
  lodash,
  isArray,
  isArrayLike,
  isObject,
  isObjectLike,
  isString,
  isFunction,
  isEqual,
  get,
  set,
  merge,
  /**
   * React
   */
  React,
  useEffect,
  useCallback,
  useLayoutEffect,
  useState,
  ComponentState,
  FunctionComponent,
  ReactElement,
  /**
   * Ink
   */
  Box,
  Spacer,
  Text,
  render,
  useApp,
  useInput,
  patchConsole,
  Instance,
  BoxProps,
  /**
   * Ink extensions
   */
  Link,
  Gradient,
  Spinner,
  Table,
  useStdoutDimensions,
  /**
   * SWR
   */
  useSwr,
  mutate,
  /**
   * Express
   */
  express,
  /**
   * Webpack
   */
  webpack,
  Stats,
  /**
   * Middlewares
   */
  webpackDevMiddleware,
  webpackHotMiddleware,
  proxyMiddleware,
  /**
   * Etc.
   */
  zlib,
}

/**
 * Grab bag
 */
export {eslintFormatter} from './util'
export {launchEditor} from './util'
export {launchEditorEndpoint} from './util'
export {notify} from './util'
export {formatWebpackMessages} from './util'
export {WatchMissingNodeModulesPlugin} from './util'
export {InterpolateHtmlPlugin} from './util'
export {checkRequiredFiles, dump} from './util'
export {processHandler} from './util'
