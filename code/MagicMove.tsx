import * as React from 'react'
import {
  PropertyControls,
  ControlType,
  Animatable,
  animate,
  Frame,
} from 'framer'

interface Props {
  width: number
  height: number

  children: React.ReactChild

  onTap: React.ReactChild
  onTapStart: React.ReactChild
  onTapEnd: React.ReactChild
  onMouseEnter: React.ReactChild
  onMouseLeave: React.ReactChild

  animate: string
  delay: number
  easing: string
  tension: number
  friction: number
  duration: number
  curve: string
}

const events = {
  // { onTap: 'Tap' },
  onTapStart: 'Tap Start',
  onTapEnd: 'Tap End',
  // { onMouseEnter: 'Hover' },
  // { onMouseLeave: 'Leave' },
}

const eventProps = value => {
  return Object.keys(events).reduce(
    (object, key) => ({ ...object, [key]: value }),
    {},
  )
}

export class MagicMove extends React.Component<Props> {
  animations = eventProps([])

  childIndex = 0

  state = {
    elements: {},
  }

  static defaultProps = {
    width: 250,
    height: 250,
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

    animate: {
      type: ControlType.SegmentedEnum,
      title: 'Animate',
      options: ['events', 'auto'],
      optionTitles: ['✦ Events', 'Auto'],
    },

    delay: {
      type: ControlType.Number,
      title: 'Delay',
      max: 10,
      step: 0.1,
      hidden(props) {
        return props.animate != 'auto'
      },
    },

    ...Object.keys(events).reduce((object, key) => {
      return {
        ...object,
        [key]: {
          type: ControlType.ComponentInstance,
          title: '✦' + events[key],
          hidden(props) {
            return props.animate != 'events'
          },
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
  }

  buildAnimation = (initial, onTapStart, onTapEnd) => {
    const { props } = this
    const options = {}
    const animated = Animatable(initial)

    if (props.easing == 'spring') {
      options['tension'] = props.tension
      options['friction'] = props.friction
    } else options['duration'] = props.duration

    if (props.easing == 'bezier')
      options['curve'] = JSON.parse(`[${props.curve}]`)

    this.animations.onTapStart = [
      ...this.animations.onTapStart,
      () => animate[props.easing](animated, onTapStart, options),
    ]

    this.animations.onTapEnd = [
      ...this.animations.onTapEnd,
      () => animate[props.easing](animated, onTapEnd, options),
    ]

    return animated
  }

  runAnimations = event =>
    this.animations[event].forEach(animation => animation())

  cleanSide = (props, side, parentSize) => {
    if (typeof props[side] == 'string') {
      if (props[side].includes('fr'))
        return parseFloat(props[side]) * parentSize[side]

      return (parseFloat(props[side]) / 100) * parentSize[side]
    }

    return props[side]
  }

  getSize = props => {
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

  getConstraints = props => {
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
        else
          returnConstraints[side] =
            props.parentSize[sizeSide] - props[oppositeSide] - cleanSide
      else
        returnConstraints[side] =
          (props.parentSize[sizeSide] *
            parseFloat(props['center' + orientation[side]])) /
            100 -
          cleanSide / 2
    })

    return returnConstraints
  }

  handleProps = ({ element, render, isParent, parentSize, stop, origin }) => {
    const props = {}
    const elements = this.state.elements
    const { childIndex } = this

    if (!render) {
      if (!elements[childIndex]) elements[childIndex] = {}
      elements[childIndex][origin] = { ...element.props, parentSize }
      this.setState({ elements })
    } else {
      const propsTransform = (Object as any).values(elements).find(e => {
        return e.initial.id == element.props.id
      })

      if (propsTransform) {
        const { initial, onTapStart, onTapEnd } = propsTransform

        if (element.type.name == 'WithEventsHOC') {
          const { getConstraints, getSize, buildAnimation } = this

          const constraints = {
            initial: getConstraints(initial),
            // DEAL WITH THE FACT YOU NEED TO PASS FUNCTION WITH PARAM
            // ...eventProps(getConstraints(propsTransform[key])),
            ...Object.keys(events).reduce(
              (object, key) => ({
                ...object,
                [key]: getConstraints(propsTransform[key]),
              }),
              {},
            ),
          }

          const size = {
            initial: getSize(initial),
            onTapStart: getSize(onTapStart),
            onTapEnd: getSize(onTapEnd),
          }

          const found = Object.keys(initial).filter(key => {
            if (typeof initial[key] == 'string' && initial[key])
              if (initial[key].includes('fr')) return true
          })

          if (!found.length && !stop) {
            props['background'] = buildAnimation(
              initial.background,
              onTapStart.background,
              onTapEnd.background,
            )
            props['opacity'] = buildAnimation(
              initial.opacity,
              onTapStart.opacity,
              onTapEnd.opacity,
            )
            props['rotation'] = buildAnimation(
              initial.rotation,
              onTapStart.rotation,
              onTapEnd.rotation,
            )
          }

          if (!isParent) {
            props['bottom'] = null
            props['right'] = null

            props['top'] = buildAnimation(
              constraints.initial.top,
              constraints.onTapStart.top,
              constraints.onTapEnd.top,
            )
            props['left'] = buildAnimation(
              constraints.initial.left,
              constraints.onTapStart.left,
              constraints.onTapEnd.left,
            )
            props['width'] = buildAnimation(
              size.initial.width,
              size.onTapStart.width,
              size.onTapEnd.width,
            )
            props['height'] = buildAnimation(
              size.initial.height,
              size.onTapStart.height,
              size.onTapEnd.height,
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
  }) => {
    if (element.type.name == 'Unwrap') stop = true
    if (isParent) this.childIndex = 0
    this.childIndex++

    return React.cloneElement(
      element,

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
          element.type.name == 'Unwrap'
            ? parentSize
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
    const { props } = this

    if (React.Children.count(props.children))
      this.clone({
        element: props.children[0],
        isParent: true,
        origin: 'initial',
      })

    for (let key in events) {
      if (React.Children.count(this.props[key])) {
        this.clone({
          element: props[key][0],
          isParent: true,
          origin: key,
        })
      }
    }
  }

  componentDidUpdate(prevProps) {
    const { animate, delay } = this.props

    if (this.props !== prevProps) this.processProps()

    console.log(this.animations)

    // if (animate == 'auto') this.runAnimations('onTapStart')

    // if (animate == 'delay')
    //   setTimeout(() => this.runAnimations('onTapStart'), delay * 1000)
  }

  componentDidMount() {
    this.processProps()
  }

  render() {
    const { width, height, children } = this.props
    let eventsSelected = {}

    for (let key in events) {
      if (React.Children.count(this.props[key])) {
        eventsSelected[key] = () => this.runAnimations(key)
      }
    }

    return React.Children.count(children) &&
      Object.keys(eventsSelected).length ? (
      <Frame {...eventsSelected}>
        {this.clone({
          element: children[0],
          render: true,
          isParent: true,
        })}
      </Frame>
    ) : (
      <div style={{ width: width, height: height }}>
        <div style={{ ...messageBoxStyle, width: width, height: height }}>
          <div style={{ display: 'flex' }}>
            <div
              style={{
                ...(children[0] ? numberStyleOff : numberStyle),
                marginRight: 15,
              }}
            >
              Initial
            </div>
            {/* <div style={target[0] ? numberStyleOff : numberStyle}>Target</div> */}
          </div>
          <div style={textStyle}>Connect to initial and target</div>
        </div>
      </div>
    )
  }
}

const messageBoxStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',

  minWidth: 175,
  height: 58,
  padding: 16,

  borderRadius: 3,
  background: 'rgba(136, 85, 255, 0.1)',
  boxShadow: 'inset 0 0 0 1px rgba(137, 87, 255, 0.5)',
}

const numberStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  width: 66,
  height: 34,

  borderRadius: 3,
  fontSize: 14,
  fontWeight: 800,
  background: '#8855FF',
  color: 'white',
}

const numberStyleOff: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  width: 66,
  height: 34,

  borderRadius: 3,
  fontSize: 14,
  fontWeight: 800,
  background: 'rgba(135, 85, 255, .3)',
  color: 'white',
}

const textStyle: React.CSSProperties = {
  fontSize: 16,
  lineHeight: 1.3,
  color: '#8855FF',
  marginTop: 10,
  textAlign: 'center',
}
