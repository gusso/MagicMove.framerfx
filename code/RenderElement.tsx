import * as React from 'react'
import { useAnimation } from 'framer'
import { isFrame } from './utils'
import { get } from './processValues'
import { ConstraintValues } from './Constraints'

let i = 0

const _RenderElement = props => {
  const { element, isParent, transition } = props
  const { children } = element.props
  const animation = useAnimation()
  const animatedProps = {}
  const animationList = props.animationList || {}

  if (isFrame(element)) {
    if (isParent) i = 0

    const variants = props.states[i]
    const initial = variants.children

    Object.keys(variants)
      .filter(variant => variant != 'children')
      .forEach(eventName => {
        const event = variants[eventName]

        const constraints = ConstraintValues.toRect(
          ConstraintValues.fromProperties(event.constraints),
          event.parentSize
        )

        const constraintStyles = {
          width: constraints.width,
          height: constraints.height,
          top: constraints.y,
          left: constraints.x,
        }

        animatedProps['initial'] = {
          borderRadius: get.radius(initial.style.borderRadius),
          backgroundColor: get.color(initial.style.backgroundColor),
          border: get.border(initial._border),
          boxShadow: get.shadow(initial.style.boxShadow),
        }

        const eventStyles = {
          rotate: event.style.rotate,
          opacity:
            event.style.opacity != undefined ? event.style.opacity : 1,
          borderRadius: get.radius(event.style.borderRadius),
          backgroundColor: get.color(event.style.backgroundColor),
          border: get.border(event._border),
          boxShadow: get.shadow(event.style.boxShadow),
          ...(!isParent && constraintStyles),
        }

        if (!animationList[eventName]) animationList[eventName] = []
        animationList[eventName].push(() => animation.start(eventStyles))

        if (isParent) {
          animatedProps[eventName] = () =>
            animationList[eventName].forEach(animation => animation())
        }
      })

    if ('auto' in variants)
      animationList.auto.forEach(animation => animation())

    const repeat = transition.animate == 'repeat'
    const times = transition.times - 1

    animatedProps['animate'] = animation
    animatedProps['transition'] = {
      type: transition.transition,
      delay: transition.delay,

      // Spring props
      damping: transition.damping,
      mass: transition.mass,
      stiffness: transition.stiffness,

      // Tween props
      duration: transition.duration,
      ease:
        transition.ease == 'custom'
          ? transition.customEase.split(',')
          : transition.ease,
      loop:
        repeat &&
        transition.repeat == 'loop' &&
        (transition.loop == 'infinity' ? Infinity : times),
      yoyo:
        repeat &&
        transition.repeat == 'yoyo' &&
        (transition.yoyo == 'infinity' ? Infinity : times),
      flip:
        repeat &&
        transition.repeat == 'flip' &&
        (transition.flip == 'infinity' ? Infinity : times),
    }

    i++
  }

  return React.cloneElement(
    element,
    animatedProps,
    !isFrame(element)
      ? children
      : React.Children.map(children, child => (
          <_RenderElement
            element={child}
            states={props.states}
            animationList={animationList}
            transition={transition}
            isParent={false}
          />
        ))
  )
}

export const RenderElement = _RenderElement
