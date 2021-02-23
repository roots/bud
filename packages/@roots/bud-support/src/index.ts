/**
 * Patch globals
 */
import './patch'

/**
 * Application dev util
 */
import * as build from './build'
import {dump} from './util/dump'
import {killPort} from './util/killPort'
export {build, dump, killPort}

/**
 * Application services base.
 */
export {Service} from './Service'

/**
 * Application util
 */
export {eslintFormatter, formatWebpackMessages} from './util'
export {notify} from './util/notify'
export {maybeAppend} from './util/maybeAppend'
export * as wpPkgs from './util/wordpressPkgs'

/**
 * Webpack
 */
import webpack from 'webpack'
export {webpack}
import type Webpack from 'webpack'
export type {Webpack}

// Plugins
export {ProgressPlugin, Stats} from 'webpack'

import InterpolateHtmlPlugin from './util/InterpolateHtmlPlugin'
export {InterpolateHtmlPlugin}

// Middlewares
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import ProxyMiddleware, {
  createProxyMiddleware,
} from 'http-proxy-middleware'
export {
  ProxyMiddleware,
  createProxyMiddleware,
  webpackHotMiddleware,
  webpackDevMiddleware,
}
// Middlewares types
import type WebpackHotMiddleware from 'webpack-hot-middleware'
import type WebpackDevMiddleware from 'webpack-dev-middleware'
export {WebpackHotMiddleware, WebpackDevMiddleware}

/**
 * Lodash
 */
import lodash from 'lodash'
export {lodash}
export {
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

// lodash typings
import type Lodash from 'lodash'
export type {Lodash}

/**
 * React
 */
import React from 'react'
export {React}
export {
  useEffect,
  useCallback,
  useLayoutEffect,
  useState,
} from 'react'
export type {
  ComponentState,
  FunctionComponent,
  ReactElement,
} from 'react'

/**
 * Ink
 */
export {Box, Spacer, Text, render, useApp, useInput} from 'ink'
export {render as staticRender} from 'ink-testing-library'
export type {Props as BoxProps} from 'ink/build/components/Box'
export type {Instance} from 'ink'

/**
 * Ink extensions
 */
import BigText from 'ink-big-text'
import Link from 'ink-link'
import Spinner from 'ink-spinner'
import Table from 'ink-table'
import Gradient from 'ink-gradient'
export {BigText, Link, Spinner, Table, Gradient}

/**
 * React hooks/util.
 */
import useSWR, {mutate} from 'swr'
import patchConsole from 'patch-console'
import useStdoutDimensions from 'ink-use-stdout-dimensions'
export {
  useSWR,
  useSWR as useSwr,
  mutate,
  patchConsole,
  useStdoutDimensions,
}

/**
 * Dependencies
 */
import chalk from 'chalk'
import chokidar from 'chokidar'
import dotenv from 'dotenv'
import execa from 'execa'
import express from 'express'
import fs from 'fs-extra'
import globby from 'globby'
import pino from 'pino'
import prettier from 'prettier'
import prettyFormat from 'pretty-format'
import yargs from 'yargs'
export {
  chalk,
  chokidar,
  dotenv,
  execa,
  express,
  fs,
  globby,
  pino,
  prettier,
  prettyFormat,
  yargs,
}
export type {execa as Execa}
export type {GlobTask, GlobbyOptions} from 'globby'
