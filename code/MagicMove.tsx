import * as React from 'react'
import { PropertyControls, ControlType, Animatable, animate } from 'framer'

interface Props {
  width: number
  height: number

  children: React.ReactChild
  target: React.ReactChild

  animate: string
  delay: number
  easing: string
  tension: number
  friction: number
  duration: number
  curve: string
}

export class MagicMove extends React.Component<Props> {
  animationList = []
  childIndex = 0

  state = {
    elements: {},
  }

  static defaultProps = {
    width: 250,
    height: 250,
    animate: 'onTap',
    delay: 1,
    easing: 'spring',
    tension: 550,
    friction: 25,
    curve: '0.25, 0.1, 0.25, 1',
    duration: 0.4,
  }

  static propertyControls: PropertyControls = {
    children: {
      type: ControlType.ComponentInstance,
      title: 'Source',
    },

    target: {
      type: ControlType.ComponentInstance,
      title: 'Target',
    },

    animate: {
      type: ControlType.SegmentedEnum,
      title: 'Animate',
      options: ['auto', 'delay', 'onTap'],
      optionTitles: ['Auto', 'Delay', 'onTap'],
    },

    delay: {
      type: ControlType.Number,
      title: 'Delay',
      max: 10,
      step: 0.1,
      hidden(props) {
        return props.animate != 'delay'
      },
    },

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

  createAnimation = (start, end) => {
    const { props } = this
    const options = {}
    const animated = Animatable(start)

    if (props.easing == 'spring') {
      options['tension'] = props.tension
      options['friction'] = props.friction
    } else options['duration'] = props.duration

    if (props.easing == 'bezier') options['curve'] = JSON.parse(`[${props.curve}]`)

    this.animationList.push(() => animate[props.easing](animated, end, options))

    return animated
  }

  runAnimations = () => this.animationList.forEach(animation => animation())

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
        return e.start.id == element.props.id
      })

      if (propsTransform) {
        const { start, end } = propsTransform

        if (element.type.name == 'WithEventsHOC') {
          const { getConstraints, getSize, createAnimation } = this

          const constraints = [getConstraints(start), getConstraints(end)]
          const size = [getSize(start), getSize(end)]

          const found = Object.keys(start).filter(key => {
            if (typeof start[key] == 'string' && start[key])
              if (start[key].includes('fr')) return true
          })

          if (!found.length && !stop) {
            props['background'] = createAnimation(start.background, end.background)
            props['opacity'] = createAnimation(start.opacity, end.opacity)
            props['rotation'] = createAnimation(start.rotation, end.rotation)
          }

          if (!isParent) {
            props['bottom'] = null
            props['right'] = null

            props['top'] = createAnimation(constraints[0].top, constraints[1].top)
            props['left'] = createAnimation(constraints[0].left, constraints[1].left)
            props['width'] = createAnimation(size[0].width, size[1].width)
            props['height'] = createAnimation(size[0].height, size[1].height)
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
        const { width, height } = stop
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
    const { children, target } = this.props

    if (React.Children.count(children) && React.Children.count(target)) {
      this.clone({ element: children[0], isParent: true, origin: 'start' })
      this.clone({ element: target[0], isParent: true, origin: 'end' })
    }
  }

  componentDidMount() {
    this.processProps()
  }

  componentDidUpdate(prevProps) {
    const { children, target, animate, delay } = this.props

    if (children !== prevProps.children || target !== prevProps.target)
      this.processProps()

    if (animate == 'auto') this.runAnimations()

    if (animate == 'delay') setTimeout(() => this.runAnimations(), delay * 1000)
  }

  render() {
    const { width, height, children, target, animate } = this.props

    return children[0] && target[0] ? (
      <div onClick={animate == 'onTap' ? this.runAnimations : undefined}>
        {this.clone({ element: children[0], render: true, isParent: true })}
      </div>
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
              Source
            </div>
            <div style={target[0] ? numberStyleOff : numberStyle}>Target</div>
          </div>
          <div style={textStyle}>Connect to source and target</div>
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
