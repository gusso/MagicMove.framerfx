import * as React from 'react'
import { useEffect } from 'react'
import { useCycle } from 'framer'
import { isFrame } from './utils'
import { get } from './processValues'
import { ConstraintValues } from './Constraints'

let i = 0

const _RenderElement = propsSource => {
  const { element, isParent, transition } = propsSource
  const { children } = element.props
  const props = {}

  if (isFrame(element)) {
    if (isParent) i = 0

    const variantsSource = propsSource.variants[i]
    const variants = {}

    const keysSource = Object.keys(variantsSource)
    const keys = keysSource.reduce((array, variant) => {
      return array.concat(variantsSource[variant].map((v, i) => variant + i))
    }, [])

    const [currentCycle, cycle] = useCycle(...keys)

    keysSource.forEach(key => {
      variantsSource[key].forEach((variant, i) => {
        const constraints = ConstraintValues.toRect(
          ConstraintValues.fromProperties(variant.constraints),
          variant.parentSize
        )

        const constraintStyles = {
          width: constraints.width,
          height: constraints.height,
          top: constraints.y,
          left: constraints.x,
        }

        variants[key + i] = {
          opacity: get.opacity(variant.style.opacity),
          rotate: variant.style.rotate,
          borderRadius: get.radius(variant.style.borderRadius),
          backgroundColor: get.color(variant.style.backgroundColor),
          border: get.border(variant._border),
          boxShadow: get.shadow(variant.style.boxShadow),
          ...(!isParent && constraintStyles),
        }
      })

      if (isParent) {
        props[key] = () => {
          let nextCycle

          if (currentCycle.includes(key)) {
            nextCycle = key + (parseInt(currentCycle.split(key)[1]) + 1)
            if (!keys.includes(nextCycle)) nextCycle = key + 0
          } else {
            nextCycle = key + 0
          }

          cycle(keys.indexOf(nextCycle))
        }
      }
    })

    props['variants'] = variants
    props['initial'] = variants['children0']
    props['animate'] = isParent && currentCycle

    useEffect(() => {
      if (isParent && keys.includes('auto0')) {
        cycle(keys.indexOf('auto0'))
      }
    }, [propsSource.variants])

    const repeat = transition.animate == 'repeat'
    const count = transition.count - 1

    props['transition'] = {
      type: transition.transition,
      delay: transition.delay,

      damping: transition.damping,
      mass: transition.mass,
      stiffness: transition.stiffness,

      duration: transition.duration,
      ease:
        transition.ease == 'custom'
          ? transition.customEase.split(',')
          : transition.ease,
      loop:
        repeat &&
        transition.repeat == 'loop' &&
        (transition.loop == 'infinity' ? Infinity : count),
      yoyo:
        repeat &&
        transition.repeat == 'yoyo' &&
        (transition.yoyo == 'infinity' ? Infinity : count),
      flip:
        repeat &&
        transition.repeat == 'flip' &&
        (transition.flip == 'infinity' ? Infinity : count),
    }

    i++
  }

  return React.cloneElement(
    element,
    props,
    !isFrame(element)
      ? children
      : React.Children.map(children, child => (
          <_RenderElement
            element={child}
            variants={propsSource.variants}
            transition={transition}
            isParent={false}
          />
        ))
  )
}

export const RenderElement = _RenderElement
