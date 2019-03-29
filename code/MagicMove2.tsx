import * as React from 'react'
import { useState, useEffect } from 'react'
import {
  ControlType,
  Animatable,
  animate,
  Frame,
  Size,
  addPropertyControls,
  useAnimation,
} from 'framer'
import EmptyState from './_EmptyState'
import { Clone } from './Clone'
import { storeProps } from './storeProps'

const isCanvas = window.hasOwnProperty('Vekter')

const eventTitles = {
  onTap: 'Tap',
  onTapStart: 'Tap Start',
  onTapEnd: 'Tap End',
  onMouseEnter: 'Mouse Over',
  onMouseLeave: 'Mouse Leave',
}

const events = Object.keys(eventTitles)

const hasChildren = children => !!React.Children.count(children)

export const MagicMove2 = props => {
  const { width, height, children } = props
  const [elements, setElements] = useState({})

  // const animations = events
  //   .concat('auto')
  //   .reduce((object, key) => ({ ...object, [key]: [] }), {})

  // const buildAnimation = (initial: number | object, ...events: object[]) => {
  // const options = {}
  // const animated = Animatable(initial)
  // if (props.easing == 'spring') {
  //   options['tension'] = props.tension
  //   options['friction'] = props.friction
  // } else options['duration'] = props.duration
  // if (props.easing == 'bezier')
  //   options['curve'] = JSON.parse(`[${props.curve}]`)
  // events.forEach(element => {
  //   const key = Object.keys(element)[0]
  //   animations[key] = [
  //     ...animations[key],
  //     () => animate[props.easing](animated, element[key], options),
  //   ]
  // })
  // console.log('go')
  // animationControl.start({ opacity: 0.5 })
  // return animationControl
  // }

  // const runAnimations = (event: string) => {
  //   animations[event].forEach(animation => animation())
  // }

  // componentDidUpdate(prevProps: object) {
  //   if (!isCanvas) {
  //     const { props } = this

  //     if (props !== prevProps) this.processProps()

  //     if (hasChildren(props.auto)) {
  //       setTimeout(() => this.runAnimations('auto'), props.delay * 1000)
  //     }
  //   }
  // }

  // useEffect(() => {
  //   if (!isCanvas) {
  // if (hasChildren(props.children))
  // <Clone
  //   element={props.children[0]}
  //   isParent
  //   origin="initial"
  //   elementHook={[elements, setElements]}
  // />
  // events.concat('auto').forEach(event => {
  //   if (hasChildren(props[event]))
  //     <Clone
  //       element={props[event][0]}
  //       isParent
  //       origin={event}
  //       elementHook={[elements, setElements]}
  //     />
  // })
  // }
  // }, [children, props.auto])

  let hasEvents = false
  let eventsConnected = {}

  events.forEach(event => {
    if (hasChildren(props[event])) {
      hasEvents = true
      // if (!isCanvas) {
      //   eventsConnected[event] = () => runAnimations(event)
      // }
    }
  })

  if (!!hasChildren(props.auto)) hasEvents = true

  const sources = events
    .concat(['children', 'auto'])
    .map(event => ({ name: event, element: props[event][0] }))

  useEffect(() => {
    storeProps(sources, setElements)
  }, [...sources.map(source => source.element)])

  console.log(elements)

  return hasChildren(children) && hasEvents ? (
    isCanvas ? (
      children
    ) : (
      <Frame {...eventsConnected} background={null} />
    )
  ) : (
    <EmptyState
      size={{ width, height }}
      initial={hasChildren(children)}
      event={hasEvents}
    />
  )
}

addPropertyControls(MagicMove2, {
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

  ...events.reduce((object, key) => {
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

MagicMove2.defaultProps = {
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
