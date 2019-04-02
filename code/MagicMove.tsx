import * as React from 'react'
import { useState, useEffect } from 'react'
import { ControlType, addPropertyControls, RenderTarget } from 'framer'
import { EmptyState } from './EmptyState'
import { RenderElement } from './RenderElement'
import { getElements } from './getElements'

export const MagicMove = props => {
  const { width, height, children } = props
  const [elements, setElements] = useState({})

  const sources = eventNames
    .concat(['children', 'auto'])
    .map(source => ({ name: source, element: props[source][0] }))

  let hasEvents = false
  eventNames.concat('auto').forEach(event => {
    if (hasChildren(props[event])) hasEvents = true
  })

  useEffect(() => {
    getElements(sources, setElements)
  }, [...sources.map(source => source.element)])

  return hasChildren(children) && hasEvents ? (
    isCanvas || Object.keys(elements).length == 0 ? (
      children
    ) : (
      <RenderElement element={children[0]} states={elements} isParent />
    )
  ) : (
    <EmptyState
      size={{ width, height }}
      initial={hasChildren(children)}
      event={hasEvents}
    />
  )
}

const eventTitles = {
  onTap: 'Tap',
  onTapStart: 'Tap Start',
  onTapCancel: 'Tap Cancel',
  onHoverStart: 'Hover Start',
  onHoverEnd: 'Hover End',
}

const eventNames = Object.keys(eventTitles)
const isCanvas = RenderTarget.current() == RenderTarget.canvas
const hasChildren = children => !!React.Children.count(children)

addPropertyControls(MagicMove, {
  children: {
    type: ControlType.ComponentInstance,
    title: 'Initial',
  },

  auto: {
    type: ControlType.Array,
    propertyControl: { type: ControlType.ComponentInstance },
    maxCount: 1,
    title: '✦︎ Automatic',
  },

  ...eventNames.reduce((object, key) => {
    return {
      ...object,
      [key]: {
        type: ControlType.Array,
        propertyControl: { type: ControlType.ComponentInstance },
        maxCount: 1,
        title: '✦ ' + eventTitles[key],
      },
    }
  }, {}),

  easing: {
    type: ControlType.Enum,
    title: 'Easing',
    options: [
      'spring',
      'bezier',
      'linear',
      'ease',
      'easeIn',
      'easeOut',
      'easeInOut',
    ],
    optionTitles: [
      'Spring',
      'Bézier curve',
      'Linear',
      'Ease',
      'Ease-in',
      'Ease-out',
      'Ease-in-out',
    ],
  },

  tension: {
    type: ControlType.Number,
    title: 'Tension',
    max: 1000,
    hidden(props) {
      return props.easing != 'spring'
    },
  },

  friction: {
    type: ControlType.Number,
    title: 'Friction',
    hidden(props) {
      return props.easing != 'spring'
    },
  },

  duration: {
    type: ControlType.Number,
    title: 'Duration',
    max: 10,
    step: 0.1,
    hidden(props) {
      return props.easing == 'spring'
    },
  },

  curve: {
    type: ControlType.String,
    title: 'Curve',
    hidden(props) {
      return props.easing != 'bezier'
    },
  },

  delay: {
    type: ControlType.Number,
    title: 'Delay',
    max: 10,
    step: 0.1,
    hidden(props) {
      return props.auto.length == 0
    },
  },
})

MagicMove.defaultProps = {
  width: 275,
  height: 220,
  animate: 'events',
  delay: 0,
  easing: 'spring',
  tension: 550,
  friction: 25,
  curve: '0.25, 0.1, 0.25, 1',
  duration: 0.4,
}
