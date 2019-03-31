import * as React from 'react'
import { useAnimation } from 'framer'
import {
  normalizeRadius,
  normalizeBorder,
  normalizeShadow,
  normalizeColor,
} from './utils.js'
import { ConstraintValues } from './Constraints'

let i = 0

const RenderElement = props => {
  const { element, isParent, parentSize } = props
  const animation = useAnimation()
  const animatedProps = {}
  const animationList = props.animationList || {}

  let { stop } = props

  if (isParent) i = 0
  if (element.type.name != 'Frame') stop = true

  const variants = props.states[i]
  const initial = variants.children

  if (!stop) {
    Object.keys(variants)
      .filter(variant => variant != 'children')
      .forEach(eventName => {
        const event = variants[eventName]

        if (!animationList[eventName]) animationList[eventName] = []

        const constraints = ConstraintValues.toRect(
          ConstraintValues.fromProperties(event.constraints),
          parentSize
        )

        animatedProps['initial'] = {
          borderRadius: normalizeRadius(initial.style.borderRadius),
          backgroundColor: normalizeColor(initial.style.backgroundColor),
          border: normalizeBorder(initial._border),
          boxShadow: normalizeShadow(initial.style.boxShadow),
        }

        let eventStyles = {
          rotate: event.style.rotate,
          opacity:
            event.style.opacity != undefined ? event.style.opacity : 1,
          borderRadius: normalizeRadius(event.style.borderRadius),
          backgroundColor: normalizeColor(event.style.backgroundColor),
          border: normalizeBorder(event._border),
          boxShadow: normalizeShadow(event.style.boxShadow),
        }

        if (!isParent) {
          eventStyles = {
            ...eventStyles,
            ...{
              width: constraints.width,
              height: constraints.height,
              top: constraints.y,
              left: constraints.x,
            },
          }
        }

        animationList[eventName].push(() => animation.start(eventStyles))

        if (isParent) {
          animatedProps[eventName] = () =>
            animationList[eventName].forEach(animation => animation())
        }
      })

    if ('auto' in variants)
      animationList.auto.forEach(animation => animation())

    animatedProps['animate'] = animation
  }

  i++

  const elementSize = {
    width: element.props.constraints && element.props.constraints.width,
    height: element.props.constraints && element.props.constraints.height,
  }

  const { children } = element.props

  return React.cloneElement(
    element,
    animatedProps,
    stop
      ? children
      : React.Children.map(children, child => (
          <RenderElement
            element={child}
            states={props.states}
            animationList={animationList}
            isParent={false}
            parentSize={elementSize}
            stop={stop}
          />
        ))
  )
}

export const RenderElements = RenderElement
