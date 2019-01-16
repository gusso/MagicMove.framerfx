// Forked from /src/components/EmptyState.tsx

import * as React from 'react'
import { Frame } from 'framer'
import { RenderEnvironment, RenderTarget } from './_RenderEnvironment'

const color = '136, 85, 255'

export const EmptyState = ({ size, initial, event }) => {
  const { zoom, target } = RenderEnvironment
  const { width, height } = size

  const minHeight = 24
  const arrowWidth = 28 / zoom
  const hasAvailableHeight = height >= minHeight / zoom

  const shouldShowArrow = hasAvailableHeight && width >= arrowWidth + 6 / zoom
  const shouldShowTitle = hasAvailableHeight && shouldShowArrow

  if (target !== RenderTarget.canvas) return null

  return (
    <Frame
      width={width}
      height={height}
      background={`rgba(${color}, 0.2)`}
      color={`rgb(${color})`}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        lineHeight: `${minHeight}px`,
        padding: '0 10px',
      }}
    >
      {shouldShowTitle && (
        <Title zoom={zoom}>
          Connect to
          <ChildType zoom={zoom} connected={initial}>
            Initial
          </ChildType>
          and
          <ChildType zoom={zoom} connected={event}>
            ✦︎ Event
          </ChildType>
        </Title>
      )}
      {shouldShowArrow && <Arrow zoom={zoom} />}
    </Frame>
  )
}

const Title = ({ zoom, children }) => (
  <span
    style={{
      flex: 'auto',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textAlign: 'center',
      fontSize: 12 * scale(zoom),
      WebkitMaskImage:
        'linear-gradient(90deg, black, black calc(100% - 12px), transparent)',
    }}
  >
    {children}
  </span>
)

const ChildType = ({ zoom, children, connected = false }) => (
  <span
    style={{
      padding: `${2 * scale(zoom)}px ${5 * scale(zoom)}px ${3 * scale(zoom)}px`,
      margin: 5 * scale(zoom),
      borderRadius: 2 * scale(zoom),
      border: `1px solid rgba(${color}, .4)`,

      background: !connected && `rgba(${color}, .9)`,
      color: !connected && `rgba(255,255,255,.8)`,
    }}
  >
    {children}
  </span>
)

const Arrow = ({ zoom }) => {
  const width = 14
  const height = 7

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      style={{
        width: width,
        opacity: 0.9,
        transform: `scale(${scale(zoom)})`,
        transformOrigin: '100% 50%',
        marginTop: 1,
      }}
    >
      <g transform="translate(0.5 0.5)">
        <path
          d="M 0 3 L 12 3"
          fill="transparent"
          stroke={`rgb(${color})`}
          strokeLinecap="butt"
        />
        <path
          d="M 9 0 L 12 3 L 9 6"
          fill="transparent"
          stroke={`rgb(${color})`}
          strokeLinecap="butt"
        />
      </g>
    </svg>
  )
}

const scale = zoom =>
  Math.ceil(0.9 * Math.pow(11, Math.pow(zoom, 0.2))) / (11 * zoom)
