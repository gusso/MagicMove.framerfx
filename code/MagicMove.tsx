import * as React from 'react'
import { useState, useEffect } from 'react'
import { ControlType, addPropertyControls, RenderTarget } from 'framer'
import { EmptyState } from './EmptyState'
import { RenderElement } from './RenderElement'
import { getElements } from './getElements'

export const MagicMove = props => {
  const { width, height, children } = props
  const [elements, setElements] = useState({})

  const sources = variantNames.map(source => ({
    name: source,
    element: props[source][0],
  }))

  let hasEvents = false
  Object.keys(events)
    .concat('auto')
    .forEach(event => {
      if (hasChildren(props[event])) hasEvents = true
    })

  useEffect(() => {
    getElements(sources, setElements)
  }, [...sources.map(source => source.element)])

  return hasChildren(children) && hasEvents ? (
    isCanvas || Object.keys(elements).length == 0 ? (
      children
    ) : (
      <RenderElement
        element={children[0]}
        states={elements}
        transition={props}
        isParent
      />
    )
  ) : (
    <EmptyState
      size={{ width, height }}
      initial={hasChildren(children)}
      event={hasEvents}
    />
  )
}

const events = {
  onTap: 'Tap',
  onTapStart: 'Tap Start',
  onTapCancel: 'Tap Cancel',
  onHoverStart: 'Hover Start',
  onHoverEnd: 'Hover End',
}

const specialVariants = { children: 'Initial', auto: 'Automatic' }
const variantTitles = { ...specialVariants, ...events }
const variantNames = Object.keys(variantTitles)

const isCanvas = RenderTarget.current() == RenderTarget.canvas
const hasChildren = children => !!React.Children.count(children)

addPropertyControls(MagicMove, {
  ...variantNames.reduce((object, key) => {
    return {
      ...object,
      [key]: {
        type: ControlType.Array,
        propertyControl: { type: ControlType.ComponentInstance },
        maxCount: 1,
        title: variantTitles[key],
      },
    }
  }, {}),

  transition: {
    title: 'Transition',
    type: ControlType.Enum,
    options: ['spring', 'tween'],
    optionTitles: ['Spring', 'Tween'],

    defaultValue: 'spring',
  },

  delay: {
    title: 'Delay',
    type: ControlType.Number,
    step: 0.1,
    displayStepper: true,

    defaultValue: 0,
  },

  duration: {
    title: 'Duration',
    type: ControlType.Number,
    step: 0.1,
    displayStepper: true,

    hidden(props) {
      return props.transition != 'tween'
    },

    defaultValue: 0.3,
  },

  damping: {
    title: 'Damping',
    type: ControlType.Number,

    hidden(props) {
      return props.transition != 'spring'
    },

    defaultValue: 10,
  },

  mass: {
    title: 'Mass',
    type: ControlType.Number,
    step: 0.1,

    hidden(props) {
      return props.transition != 'spring'
    },

    defaultValue: 1,
  },

  stiffness: {
    title: 'Stiffness',
    type: ControlType.Number,

    hidden(props) {
      return props.transition != 'spring'
    },

    defaultValue: 100,
  },

  velocity: {
    title: 'Velocity',
    type: ControlType.Number,

    hidden(props) {
      return props.transition != 'spring'
    },

    defaultValue: 1,
  },

  ease: {
    title: 'Easing',
    type: ControlType.Enum,
    options: [
      'custom',
      'linear',
      'easeIn',
      'easeOut',
      'easeInOut',
      'circIn',
      'circOut',
      'circInOut',
      'backIn',
      'backOut',
      'backInOut',
      'anticipate',
    ],
    optionTitles: [
      'Custom',
      'linear',
      'easeIn',
      'easeOut',
      'easeInOut',
      'circIn',
      'circOut',
      'circInOut',
      'backIn',
      'backOut',
      'backInOut',
      'anticipate',
    ],

    hidden(props) {
      return props.transition != 'tween'
    },

    defaultValue: 'linear',
  },

  customEase: {
    title: 'Custom',
    type: ControlType.String,

    hidden(props) {
      return props.transition != 'tween' || props.ease != 'custom'
    },

    defaultValue: '0.25, 0.1, 0.25, 1',
  },

  animate: {
    title: 'Animate',
    type: ControlType.SegmentedEnum,
    options: ['once', 'repeat'],
    optionTitles: ['Once', 'Repeat'],

    hidden(props) {
      return props.transition != 'tween'
    },

    defaultValue: 'once',
  },

  repeat: {
    title: 'Repeat',
    type: ControlType.SegmentedEnum,
    options: ['loop', 'yoyo', 'flip'],
    optionTitles: ['Loop', 'Yoyo', 'Flip'],

    hidden(props) {
      return props.transition != 'tween' || props.animate != 'repeat'
    },

    defaultValue: 'loop',
  },

  loop: {
    title: 'Loop',
    type: ControlType.SegmentedEnum,
    options: ['number', 'infinity'],
    optionTitles: ['Number', 'Infinity'],

    hidden(props) {
      return (
        props.transition != 'tween' ||
        props.animate != 'repeat' ||
        props.repeat != 'loop'
      )
    },

    defaultValue: 'infinity',
  },

  yoyo: {
    title: 'Yoyo',
    type: ControlType.SegmentedEnum,
    options: ['number', 'infinity'],
    optionTitles: ['Number', 'Infinity'],

    hidden(props) {
      return (
        props.transition != 'tween' ||
        props.animate != 'repeat' ||
        props.repeat != 'yoyo'
      )
    },

    defaultValue: 'infinity',
  },

  flip: {
    title: 'Flip',
    type: ControlType.SegmentedEnum,
    options: ['number', 'infinity'],
    optionTitles: ['Number', 'Infinity'],

    hidden(props) {
      return (
        props.transition != 'tween' ||
        props.animate != 'repeat' ||
        props.repeat != 'flip'
      )
    },

    defaultValue: 'infinity',
  },

  times: {
    title: 'Times',
    type: ControlType.Number,
    displayStepper: true,

    hidden(props) {
      return (
        props.transition != 'tween' ||
        props.animate != 'repeat' ||
        (props.repeat == 'loop' && props.loop != 'number') ||
        (props.repeat == 'yoyo' && props.yoyo != 'number') ||
        (props.repeat == 'flip' && props.flip != 'number')
      )
    },

    defaultValue: 2,
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
  // duration: 0.4,
}
