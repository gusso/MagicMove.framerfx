import * as React from 'react'
import { useState, useEffect } from 'react'
import { ControlType, addPropertyControls, RenderTarget } from 'framer'
import { EmptyState } from './EmptyState'
import { RenderElement } from './RenderElement'
import { getElements } from './getElements'

export const MagicMove = props => {
  const { width, height, children } = props
  const [elements, setElements] = useState({})

  const variants = variantKeys.map(variant => ({
    name: variant,
    elements: props[variant],
  }))

  useEffect(() => {
    if (hasChildren(children)) {
      getElements(variants, setElements)
    }
  }, [...variants.map(source => source.elements)])

  let hasEvents = false
  Object.keys(events)
    .concat('auto')
    .forEach(event => {
      if (hasChildren(props[event])) hasEvents = true
    })

  return hasChildren(children) && hasEvents ? (
    isCanvas || Object.keys(elements).length == 0 ? (
      children
    ) : (
      <RenderElement
        element={children[0]}
        variants={elements}
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
const variantKeys = Object.keys(variantTitles)

const isCanvas = RenderTarget.current() == RenderTarget.canvas
const hasChildren = children => !!React.Children.count(children)

addPropertyControls(MagicMove, {
  ...variantKeys.reduce((object, key) => {
    return {
      ...object,
      [key]: {
        title: variantTitles[key],
        type: ControlType.Array,
        propertyControl: { type: ControlType.ComponentInstance },
        maxCount: key == 'children' || key == 'auto' ? 1 : null,
      },
    }
  }, {}),

  options: {
    title: 'Options',
    type: ControlType.SegmentedEnum,
    options: ['transition', 'timing'],
    optionTitles: ['Transition', 'Timing'],

    defaultValue: 'transition',
  },

  delay: {
    title: 'Delay All',
    type: ControlType.Number,
    step: 0.1,
    min: 0,
    displayStepper: true,

    hidden(props) {
      return props.options != 'timing'
    },

    defaultValue: 0,
  },

  delayChildren: {
    title: 'Delay Child',
    type: ControlType.Number,
    step: 0.05,
    min: 0,
    displayStepper: true,

    hidden(props) {
      return props.options != 'timing'
    },

    defaultValue: 0,
  },

  staggerChildren: {
    title: 'Stagger',
    type: ControlType.Number,
    step: 0.05,
    min: 0,
    displayStepper: true,

    hidden(props) {
      return props.options != 'timing'
    },

    defaultValue: 0,
  },

  transition: {
    title: 'Transition',
    type: ControlType.Enum,
    options: ['spring', 'tween'],
    optionTitles: ['Spring', 'Tween'],

    hidden(props) {
      return props.options != 'transition'
    },

    defaultValue: 'spring',
  },

  damping: {
    title: 'Damping',
    type: ControlType.Number,
    min: 0,
    max: 300,

    hidden(props) {
      return props.options != 'transition' || props.transition != 'spring'
    },

    defaultValue: 35,
  },

  mass: {
    title: 'Mass',
    type: ControlType.Number,
    step: 0.1,
    min: 0,
    max: 5,

    hidden(props) {
      return props.options != 'transition' || props.transition != 'spring'
    },

    defaultValue: 1,
  },

  stiffness: {
    title: 'Stiffness',
    type: ControlType.Number,
    min: 0,
    max: 1000,

    hidden(props) {
      return props.options != 'transition' || props.transition != 'spring'
    },

    defaultValue: 700,
  },

  duration: {
    title: 'Duration',
    type: ControlType.Number,
    step: 0.1,
    min: 0,
    displayStepper: true,

    hidden(props) {
      return props.options != 'transition' || props.transition != 'tween'
    },

    defaultValue: 0.3,
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
      return props.options != 'transition' || props.transition != 'tween'
    },

    defaultValue: 'easeOut',
  },

  customEase: {
    title: 'Custom',
    type: ControlType.String,

    hidden(props) {
      return (
        props.options != 'transition' ||
        props.transition != 'tween' ||
        props.ease != 'custom'
      )
    },

    defaultValue: '0.25, 0.1, 0.25, 1',
  },

  animate: {
    title: 'Animate',
    type: ControlType.SegmentedEnum,
    options: ['once', 'repeat'],
    optionTitles: ['Once', 'Repeat'],

    hidden(props) {
      return props.options != 'transition' || props.transition != 'tween'
    },

    defaultValue: 'once',
  },

  repeat: {
    title: 'Repeat',
    type: ControlType.SegmentedEnum,
    options: ['loop', 'yoyo', 'flip'],
    optionTitles: ['Loop', 'Yoyo', 'Flip'],

    hidden(props) {
      return (
        props.options != 'transition' ||
        props.transition != 'tween' ||
        props.animate != 'repeat'
      )
    },

    defaultValue: 'loop',
  },

  loop: {
    title: 'Loop',
    type: ControlType.SegmentedEnum,
    options: ['count', 'infinity'],
    optionTitles: ['Count', 'Infinity'],

    hidden(props) {
      return (
        props.options != 'transition' ||
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
    options: ['count', 'infinity'],
    optionTitles: ['Count', 'Infinity'],

    hidden(props) {
      return (
        props.options != 'transition' ||
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
    options: ['count', 'infinity'],
    optionTitles: ['Count', 'Infinity'],

    hidden(props) {
      return (
        props.options != 'transition' ||
        props.transition != 'tween' ||
        props.animate != 'repeat' ||
        props.repeat != 'flip'
      )
    },

    defaultValue: 'infinity',
  },

  count: {
    title: 'Count',
    type: ControlType.Number,
    displayStepper: true,
    min: 1,

    hidden(props) {
      return (
        props.options != 'transition' ||
        props.transition != 'tween' ||
        props.animate != 'repeat' ||
        (props.repeat == 'loop' && props.loop != 'count') ||
        (props.repeat == 'yoyo' && props.yoyo != 'count') ||
        (props.repeat == 'flip' && props.flip != 'count')
      )
    },

    defaultValue: 2,
  },
})

MagicMove.defaultProps = {
  width: 400,
  height: 400,
}
