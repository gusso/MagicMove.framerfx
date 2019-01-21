// Forked from /src/components/EmptyState.tsx

import * as React from 'react'
import { Frame, Size } from 'framer'

const color = '136, 85, 255'

export interface Props {
  initial: boolean
  event: boolean
  size: Size
}

export default ({ size, initial, event }: Props) => {
  const { width, height } = size

  const minHeight = 24
  const arrowWidth = 28
  const hasAvailableHeight = height >= minHeight

  const shouldShowArrow = hasAvailableHeight && width >= arrowWidth + 6
  const shouldShowTitle = hasAvailableHeight && shouldShowArrow

  const Title: React.SFC = ({ children }) => (
    <span
      style={{
        flex: 'auto',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textAlign: 'center',
        fontSize: 12,
        WebkitMaskImage:
          'linear-gradient(90deg, black, black calc(100% - 12px), transparent)',
      }}
    >
      {children}
    </span>
  )

  const ChildType: React.SFC<{ connected: boolean }> = ({
    children,
    connected = false,
  }) => (
    <span
      style={{
        padding: `2px 5px 3px`,
        margin: 5,
        borderRadius: 2,
        border: `1px solid rgba(${color}, .4)`,

        background: !connected && `rgba(${color}, .9)`,
        color: !connected && `rgba(255,255,255,.8)`,
      }}
    >
      {children}
    </span>
  )

  const Arrow = () => {
    const width = 14
    const height = 7

    return (
      <svg
        viewBox={`0 0 ${width} ${height}`}
        style={{ flexShrink: 0, width: width, marginTop: 1 }}
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
        <Title>
          Connect to
          <ChildType connected={initial}>Initial</ChildType>
          and
          <ChildType connected={event}>✦︎ Event</ChildType>
        </Title>
      )}
      {shouldShowArrow && <Arrow />}
    </Frame>
  )
}
