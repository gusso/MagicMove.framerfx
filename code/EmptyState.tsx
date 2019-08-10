import * as React from 'react'
import { Frame, Color } from 'framer'
import { isCanvas, isThumbnail } from './utils'

const _EmptyState = ({ height, initial, event }) => {
  const showChecklist = height >= 75
  const scaleFactor =
    'var(--framerInternalCanvas-canvasPlaceholderContentScaleFactor, 1)'

  const color = (a = 1) => Color.toString(Color.alpha(Color('#85F'), a))

  const Check = () => (
    <svg viewBox='0 0 13 13'>
      <path
        d='M 3.5 7.5 L 5.5 9 L 9 4'
        fill='transparent'
        stroke-width='1.75'
        stroke='white'
        stroke-linecap='square'
      />
    </svg>
  )

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
        {connected && <Check />}
      </div>
    )
  }

  const Item = ({ children, connected = false }) => (
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

  const Checklist = () => (
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

  const Star = props => {
    const { shadow } = props

    return (
      <svg
        width='33'
        height='33'
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          willChange: 'transform',
          transformOrigin: '85% 12%',
          transform:
            'scale(6.3)' +
            (shadow ? ` translate(${shadow[0]}px, ${shadow[1]}px)` : ''),
          filter: shadow && `blur(${shadow[2]}px)`,
          opacity: shadow && shadow[3],
        }}
      >
        <path
          d='M21.1686 19.2576C20.6893 19.2086 20.2165 19.3996 19.9048 19.7682L18.0235 22.0016C17.244 22.9259 15.7425 22.5543 15.4838 21.3722L14.8526 18.4832C14.7503 18.0166 14.4264 17.6286 13.9852 17.4467L11.2502 16.3181C10.1357 15.858 10.0298 14.3197 11.0707 13.7115L13.6044 12.2305C14.0195 11.9873 14.2886 11.5561 14.3224 11.0765L14.5345 8.14996C14.6211 6.94152 16.0592 6.3605 16.9619 7.16924L19.1465 9.12745C19.5049 9.44857 19.998 9.57184 20.4646 9.4588L23.316 8.76407C24.4883 8.47812 25.4797 9.65869 24.9976 10.7638L23.8152 13.4751C23.6241 13.9126 23.6597 14.417 23.9103 14.8237L25.464 17.3399C26.0991 18.37 25.2771 19.6803 24.0743 19.5569L21.1686 19.2576Z'
          fill={!shadow && 'url(#gradient)'}
        />

        {!shadow && (
          <defs>
            <linearGradient id='gradient' gradientTransform='rotate(85)'>
              <stop stop-color='#AC32FF' />
              <stop offset='1' stop-color='#8600FF' />
            </linearGradient>
          </defs>
        )}
      </svg>
    )
  }

  const Icon = () => (
    <>
      <Star shadow={[-1, 3, 2.1, 0.09]} />
      <Star shadow={[-0.5, 1.3, 0.7, 0.13]} />
      <Star />
    </>
  )

  return (
    (isCanvas() || isThumbnail()) && (
      <Frame
        size='100%'
        background={color(0.1)}
        border={`calc(${
          isThumbnail() ? 11 : 1
        }px * ${scaleFactor}) dashed ${color(0.2)}`}
      >
        {isThumbnail() ? <Icon /> : showChecklist && <Checklist />}
      </Frame>
    )
  )
}

export const EmptyState = _EmptyState
