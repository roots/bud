import chalk from 'chalk'
import figures, {mainSymbols} from 'figures'
import humanReadable from 'human-readable'
import {truncate} from 'lodash-es'
import type {StatsAsset, StatsCompilation} from 'webpack'

import {theme} from './theme.js'

export const color = (asset: StatsAsset) =>
  asset.info.error
    ? theme.red
    : asset.info.warning
    ? theme.yellow
    : asset.emitted
    ? theme.green
    : theme.dim

export const icon = (asset: StatsAsset) =>
  asset.info.minimized && asset.emitted
    ? figures.circleFilled
    : asset.emitted
    ? figures.circle
    : asset.info.error
    ? figures.cross
    : asset.info.warning
    ? figures.warning
    : figures.circleDotted

export const status = (asset: StatsAsset) => icon(asset)

export const name = (asset: StatsAsset) => {
  const fullAssetName = asset.info.hotModuleReplacement
    ? asset.name.split(`.`)[0]
    : asset.name

  const assetName = truncate(fullAssetName, {
    length: process.stdout.columns < 80 ? process.stdout.columns / 2 : 50,
    omission: mainSymbols.ellipsis,
  })

  return chalk.hex(!asset.emitted ? theme.dim : theme.foregroundColor)(
    assetName,
  )
}

export const chunk = (asset: StatsAsset) =>
  chalk.hex(color(asset))(
    asset.chunkNames.length ? asset.chunkNames.join(` `) : `᠃`,
  )

export const size = (asset: StatsAsset) =>
  chalk.hex(theme.dim)(humanReadable.sizeFormatter()(asset.info.size))

export const hot = (compilation: StatsCompilation) =>
  compilation.assets.filter(
    asset =>
      asset.name.endsWith(`.js`) && asset.name?.includes(`hot-update`),
  ) ?? []

export const statics = (compilation: StatsCompilation) => {
  const list = compilation.assets.filter(
    asset =>
      ![`js`, `css`].includes(asset.name.split('.').pop()) &&
      !asset.name?.includes(`hot-update`),
  )

  return list
}

export const assets = (compilation: StatsCompilation) =>
  compilation.assets.filter(
    asset =>
      asset.name?.endsWith(`.css`) ||
      (asset.name?.endsWith(`.js`) && !asset.name?.includes('hot-update')),
  ) ?? []

export const time = (time: StatsAsset['time'] & string) =>
  humanReadable.durationFormatter({
    allowMultiples: ['s', 'ms'],
  })(time) as string

export const group = (assets: StatsCompilation['assets']) =>
  assets?.length
    ? assets.map(asset => [status(asset), name(asset), size(asset)])
    : []
