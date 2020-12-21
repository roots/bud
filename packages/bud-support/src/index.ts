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
  has,
  set,
  merge,
} from 'lodash'
import fs from 'fs-extra'
import globby, {GlobTask, GlobbyOptions} from 'globby'
import yargs from 'yargs'
import execa from 'execa'
import express from 'express'
import prettier from 'prettier'
import dotenv from 'dotenv'
import pino from 'pino'
import prettyFormat from 'pretty-format'
import zlib from 'zlib'
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
import webpack, {Stats, ProgressPlugin} from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import ProxyMiddleware, {
  createProxyMiddleware,
} from 'http-proxy-middleware'

import useSwr, {mutate} from 'swr'

import * as build from './build'

export {
  /**
   * Build utilities (bud devo)
   */
  build,
  /**
   * Execa
   */
  execa,
  /**
   * Dotenv
   */
  dotenv,
  /**
   * Express
   */
  express,
  /**
   * fs-extra
   */
  fs,
  /**
   * globby
   */
  globby,
  GlobTask,
  GlobbyOptions,
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
  has,
  set,
  merge,
  /**
   * pino
   */
  pino,
  /**
   * Prettier
   */
  prettier,
  /**
   * pretty-format
   */
  prettyFormat,
  /**
   * Webpack
   */
  webpack,
  ProgressPlugin,
  Stats,
  /**
   * Middlewares
   */
  webpackDevMiddleware,
  webpackHotMiddleware,
  ProxyMiddleware,
  createProxyMiddleware,
  /**
   * Yargs
   */
  yargs,
  /**
   * Etc.
   */
  zlib,
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
   * SWR
   */
  useSwr,
  mutate,
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
}

/**
 * Application services
 */
export {Service, ServiceContainer} from './Service'

/**
 * Grab bag
 */
export {eslintFormatter} from './util'
export {notify} from './util/notify'
export {dump} from './util/dump'

import InterpolateHtmlPlugin from './util/InterpolateHtmlPlugin'
export {InterpolateHtmlPlugin}
