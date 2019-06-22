import * as React from 'react'
import { useEffect } from 'react'
import { useCycle } from 'framer'
import { isFrame } from './utils'
import { get } from './processValues'
import { calculateRect } from './NewConstraints'

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

    const runCycle = nextCycle => {
      setTimeout(() => {
        cycle(keys.indexOf(nextCycle))
      }, transition.delay * 1000)
    }

    keysSource.forEach(key => {
      variantsSource[key].forEach((variant, i) => {
        const constraints = calculateRect(variant, variant.parentSize)

        const size = {
          width: constraints.width,
          height: constraints.height,
        }

        const position = {
          top: constraints.y,
          left: constraints.x,
        }

        variants[key + i] = {
          opacity: get.opacity(variant.style.opacity),
          rotate: variant.style.rotate,
          borderRadius: get.radius(variant.style.borderRadius),
          border: get.border(variant._border),
          boxShadow: get.shadow(variant.style.boxShadow),
          ...(variant.background &&
            !variant.background.src && {
              background: get.bgColor(variant.background),
            }),
          ...(!isParent && size),
          ...(!isParent && key == 'children' && position),
          ...(!isParent &&
            key != 'children' && {
              y: position.top - variants['children0'].top,
              x: position.left - variants['children0'].left,
            }),
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

          runCycle(nextCycle)
        }
      }
    })

    props['center'] = null
    props['variants'] = variants
    props['initial'] = variants['children0']
    props['animate'] = isParent && currentCycle

    useEffect(() => {
      if (isParent && keys.includes('auto0')) {
        runCycle('auto0')
      }
    }, [propsSource.variants])

    const repeat = transition.animate == 'repeat'
    const count = transition.count - 1
    const repeatCount =
      transition.repeatCount == 'infinity' ? Infinity : count

    props['transition'] = {
      type: transition.transition,

      staggerChildren: isParent && transition.staggerChildren,
      staggerDirection: parseInt(transition.staggerDirection),

      damping: transition.damping,
      mass: transition.mass,
      stiffness: transition.stiffness,

      duration: transition.duration,
      ease:
        transition.ease == 'custom'
          ? transition.customEase.split(',').map(Number)
          : transition.ease,
      loop: repeat && transition.repeat == 'loop' && repeatCount,
      yoyo: repeat && transition.repeat == 'yoyo' && repeatCount,
      flip: repeat && transition.repeat == 'flip' && repeatCount,
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
