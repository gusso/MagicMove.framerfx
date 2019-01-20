import * as React from 'react'
import {
  PropertyControls,
  ControlType,
  Animatable,
  animate,
  Frame,
} from 'framer'
import EmptyState from './_EmptyState'

interface Props {
  width: number
  height: number

  animate: string
  delay: number
  easing: string
  tension: number
  friction: number
  duration: number
  curve: string

  auto: React.ReactNode
}

interface CloneProps {
  element: React.ReactElement<any>
  render: boolean
  isParent: boolean
  parentSize: object
  stop: boolean
  origin: string
}

const eventTitles = {
  onTap: 'Tap',
  onTapStart: 'Tap Start',
  onTapEnd: 'Tap End',
  onMouseEnter: 'Mouse Over',
  onMouseLeave: 'Mouse Leave',
}

const events = Object.keys(eventTitles)

const hasChildren = (children: React.ReactNode) =>
  React.Children.count(children)

export class MagicMove extends React.Component<Props> {
  childIndex = 0

  animations = events
    .concat('auto')
    .reduce((object, key) => ({ ...object, [key]: [] }), {})

  state = { elements: {} }

  static defaultProps = {
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

  static propertyControls: PropertyControls = {
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
  }

  buildAnimation = (initial: number | object, ...events: object[]) => {
    const { props, animations } = this
    const options = {}
    const animated = Animatable(initial)

    if (props.easing == 'spring') {
      options['tension'] = props.tension
      options['friction'] = props.friction
    } else options['duration'] = props.duration

    if (props.easing == 'bezier')
      options['curve'] = JSON.parse(`[${props.curve}]`)

    events.forEach(element => {
      const key = Object.keys(element)[0]

      animations[key] = [
        ...animations[key],
        () => animate[props.easing](animated, element[key], options),
      ]
    })

    return animated
  }

  runAnimations = (event: string) =>
    this.animations[event].forEach(animation => animation())

  cleanSide = (props: object, side: string, parentSize: object) => {
    if (typeof props[side] == 'string') {
      if (props[side].includes('fr'))
        return parseFloat(props[side]) * parentSize[side]

      return (parseFloat(props[side]) / 100) * parentSize[side]
    }

    return props[side]
  }

  getSize = (props: {
    left: number
    right: number
    top: number
    bottom: number
    parentSize: object
  }) => {
    const { left, right, top, bottom, parentSize } = props

    const size = {
      width: [left, right],
      height: [top, bottom],
    }

    const returnSize = {
      width: null,
      height: null,
    }

    for (const side in size)
      returnSize[side] = size[side].every(i => i != null)
        ? parentSize[side] - size[side][0] - size[side][1]
        : this.cleanSide(props, side, parentSize)

    return returnSize
  }

  getConstraints = (props: { parentSize: object }) => {
    const orientation = { top: 'Y', left: 'X' }
    const constraints = ['top', 'left']

    const returnConstraints = {
      top: null,
      left: null,
    }

    constraints.forEach(side => {
      const sizeSide = side == 'left' ? 'width' : 'height'
      const oppositeSide = side == 'left' ? 'right' : 'bottom'
      const cleanSide = this.cleanSide(props, sizeSide, props.parentSize)

      if (constraints.every(i => props[i] != null))
        returnConstraints[side] = props[side]
      else if (![side, oppositeSide].every(i => props[i] == null))
        if (props[side] != null) returnConstraints[side] = props[side]
        else {
          returnConstraints[side] =
            props.parentSize[sizeSide] - props[oppositeSide] - cleanSide
        }
      else
        returnConstraints[side] =
          (props.parentSize[sizeSide] *
            parseFloat(props['center' + orientation[side]])) /
            100 -
          cleanSide / 2
    })

    return returnConstraints
  }

  handleProps = ({
    element,
    render,
    isParent,
    parentSize,
    stop,
    origin,
  }: CloneProps) => {
    const props = {}
    const elements = this.state.elements
    const { childIndex } = this

    if (!render) {
      if (!elements[childIndex]) elements[childIndex] = {}
      elements[childIndex][origin] = { ...element.props, parentSize }
      this.setState({ elements })
    } else {
      const propsTransform = (Object as any).values(elements).find(e => {
        return e[Object.keys(e)[0]].id == element.props.id
      })

      if (propsTransform) {
        const { initial } = propsTransform

        if (element.type['name'] == 'WithEventsHOC') {
          const { getConstraints, getSize, buildAnimation } = this

          const events = Object.keys(propsTransform).filter(
            state => state != 'initial',
          )

          const found = Object.keys(initial).filter(key => {
            if (typeof initial[key] == 'string' && initial[key])
              if (initial[key].includes('fr')) return true
          })

          if (!found.length && !stop) {
            props['background'] = buildAnimation(
              initial.background,
              ...events.map(key => ({
                [key]: propsTransform[key].background,
              })),
            )

            props['opacity'] = buildAnimation(
              initial.opacity,
              ...events.map(key => ({
                [key]: propsTransform[key].opacity,
              })),
            )

            props['rotation'] = buildAnimation(
              initial.rotation,
              ...events.map(key => ({
                [key]: propsTransform[key].rotation,
              })),
            )
          }

          if (!isParent) {
            const constraints = {
              initial: getConstraints(initial),
              ...events.reduce(
                (object, key) => ({
                  ...object,
                  [key]: getConstraints(propsTransform[key]),
                }),
                {},
              ),
            }

            const size = {
              initial: getSize(initial),
              ...events.reduce(
                (object, key) => ({
                  ...object,
                  [key]: getSize(propsTransform[key]),
                }),
                {},
              ),
            }

            props['bottom'] = null
            props['right'] = null

            props['top'] = buildAnimation(
              constraints.initial.top,
              ...events.map(key => ({
                [key]: constraints[key].top,
              })),
            )

            props['left'] = buildAnimation(
              constraints.initial.left,
              ...events.map(key => ({
                [key]: constraints[key].left,
              })),
            )

            props['width'] = buildAnimation(
              size.initial.width,
              ...events.map(key => ({
                [key]: size[key].width,
              })),
            )

            props['height'] = buildAnimation(
              size.initial.height,
              ...events.map(key => ({
                [key]: size[key].height,
              })),
            )
          }
        }
      }
    }

    return props
  }

  clone = ({
    element,
    render = false,
    isParent = false,
    stop = false,
    parentSize = null,
    origin = null,
  }: Partial<CloneProps>) => {
    if (element.type['name'] == 'Unwrap') stop = true
    if (isParent) this.childIndex = 0
    this.childIndex++

    return React.cloneElement(
      element as React.ReactElement<any>,

      this.handleProps({
        element,
        render,
        isParent,
        stop,
        parentSize,
        origin,
      }),

      React.Children.map(element.props.children, child => {
        const { width, height } =
          element.type['name'] == 'Unwrap'
            ? (parentSize as { width: number; height: number })
            : this.getSize({ ...element.props, parentSize })

        return this.clone({
          element: child,
          render,
          stop,
          parentSize: { width, height },
          origin,
        })
      }),
    )
  }

  processProps = () => {
    const { props, clone } = this

    if (hasChildren(props.children))
      clone({
        element: props.children[0],
        isParent: true,
        origin: 'initial',
      })

    events.concat('auto').forEach(event => {
      if (hasChildren(props[event])) {
        clone({
          element: props[event][0],
          isParent: true,
          origin: event,
        })
      }
    })
  }

  componentDidUpdate(prevProps: object) {
    const { props } = this

    if (props !== prevProps) this.processProps()

    if (hasChildren(props.auto)) {
      setTimeout(() => this.runAnimations('auto'), props.delay * 1000)
    }
  }

  componentDidMount() {
    this.processProps()
  }

  render() {
    const { width, height, children, auto } = this.props
    let eventsSelected = {}

    events.forEach(event => {
      if (hasChildren(this.props[event])) {
        eventsSelected[event] = () => this.runAnimations(event)
      }
    })

    const hasEvents = Object.keys(eventsSelected).length || hasChildren(auto)

    return hasChildren(children) && hasEvents ? (
      <Frame {...eventsSelected} background={null}>
        {this.clone({ element: children[0], render: true, isParent: true })}
      </Frame>
    ) : (
      <EmptyState
        size={{ width, height }}
        initial={hasChildren(children)}
        event={hasEvents}
      />
    )
  }
}
