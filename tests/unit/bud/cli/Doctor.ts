import Doctor from '@roots/bud/src/cli/commands/doctor'

import {mocks} from './__mocks__/index'

describe('Doctor', () => {
  let doctor: Doctor
  let bud

  beforeEach(async () => {
    doctor = new Doctor([], null)
    bud = mocks.bud
    Object.assign(doctor, {app: bud})
  })

  afterEach(() => {
    // spies
    jest.restoreAllMocks()
    // mocked fn
    jest.clearAllMocks()
  })

  it('hasMissingPeers', () => {
    expect(doctor.hasMissingPeers).toBeInstanceOf(Function)
  })

  it('hasMissingPeers returns false', () => {
    expect(doctor.hasMissingPeers()).toBe(false)
  })

  it('getMissingPeers', () => {
    expect(doctor.getMissingPeers).toBeInstanceOf(Function)
  })

  it('getMissingPeers', () => {
    expect(doctor.getMissingPeers()).toEqual([])
  })

  it('displayFeedback', () => {
    expect(doctor.displayFeedback).toBeInstanceOf(Function)
  })

  it('displayFeedback method when all dependencies met', () => {
    doctor.displayFeedback([])

    expect(bud.dashboard.render).toHaveBeenCalledWith(
      'All checks are O.K.',
      'bud doctor',
    )
  })

  it('displayFeedback method when dependencies unmet', () => {
    doctor.displayFeedback([{name: 'postcss'}])

    expect(bud.dashboard.render).toHaveBeenCalledWith(
      [
        '❌ postcss',
        '\n',
        'Run `bud init` to install missing dependencies',
      ],
      'Missing dependencies',
    )
  })
})
