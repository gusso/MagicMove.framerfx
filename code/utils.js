import * as React from 'react'
import { RenderTarget } from 'framer'

export const isFiniteNumber = value =>
  typeof value === 'number' && isFinite(value)

export const isFrame = element => element.type.name == 'Frame'

export const isCanvas = () => RenderTarget.current() == RenderTarget.canvas

export const hasChildren = children => !!React.Children.count(children)
