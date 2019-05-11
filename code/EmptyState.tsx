import * as React from 'react'
import { Frame, Color } from 'framer'
import { isCanvas } from './utils'

const _EmptyState = ({ size, initial, event }) => {
  const { width, height } = size

  const showChecklist = height >= 75
  const scaleFactor =
    'var(--framerInternalCanvas-canvasPlaceholderContentScaleFactor, 1)'

  const color = (a = 1) => Color.toString(Color.alpha(Color('#85F'), a))

  const Icon = ({ size }) => {
    return (
      <svg width={size} height={size} viewBox='0 0 13 13'>
        <path
          d='M 3.5 7.5 L 5.5 9 L 9 4'
          fill='transparent'
          stroke-width='1.75'
          stroke='white'
          stroke-linecap='square'
        />
      </svg>
    )
  }

  const Checkbox = ({ connected = false }) => {
    const size = 11
    const margin = 4

    return (
      <div
        style={{
          width: size,
          height: size,

          margin: margin,
          marginTop: margin + 1,
          marginRight: 12,

          borderRadius: 3,
          background: connected ? color() : color(0.25),
        }}
      >
        {connected && <Icon size={size} />}
      </div>
    )
  }

  const Item = ({ children, connected = false }) => {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',

          color: color(),
        }}
      >
        <div>{children}</div>
        <Checkbox connected={connected} />
      </div>
    )
  }

  const Checklist = () => {
    return (
      <div
        style={{
          display: 'grid',
          alignItems: 'center',
          justifyContent: 'end',
          height: '100%',
          WebkitMaskImage: `linear-gradient(90deg, transparent, black calc(12px * ${scaleFactor}), black)`,
        }}
      >
        <div
          style={{
            transformOrigin: '100% 50%',
            transform: `scale(calc(${scaleFactor}))`,
          }}
        >
          <Item connected={initial}>Initial</Item>
          <Item connected={event}>Event</Item>
        </div>
      </div>
    )
  }

  return (
    isCanvas() && (
      <Frame
        width={width}
        height={height}
        background={color(0.1)}
        border={`calc(1px * ${scaleFactor}) dashed ${color(0.2)}`}
      >
        {showChecklist && <Checklist />}
      </Frame>
    )
  )
}

export const EmptyState = _EmptyState
