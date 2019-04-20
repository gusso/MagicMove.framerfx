import * as React from 'react'
import { Frame } from 'framer'

const color = '136, 85, 255'

const _EmptyState = ({ size, initial, event }) => {
  const { width, height } = size

  const Radio = ({ connected = false }) => (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

        width: 9,
        height: 9,
        margin: 5,
        marginTop: 6,

        borderRadius: '50%',
        border: `1px solid rgb(${color})`,
        background: connected ? `rgb(${color})` : 'white',
      }}
    >
      <div
        style={{
          width: 3,
          height: 3,
          borderRadius: '50%',
          background: 'white',
        }}
      />
    </div>
  )

  const ChildType = ({ children, connected = false }) => (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',

        color: !connected && `rgb(${color})`,
      }}
    >
      <div>{children}</div>
      <Radio connected={connected} />
    </div>
  )

  return (
    <Frame
      width={width}
      height={height}
      background={`rgba(136, 85, 255, 0.15)`}
      color={`rgb(${color})`}
      style={{
        display: 'grid',
        padding: 10,
        alignContent: 'center',
      }}
    >
      <ChildType connected={initial}>Initial</ChildType>
      <ChildType connected={event}>Event</ChildType>
    </Frame>
  )
}

export const EmptyState = _EmptyState
