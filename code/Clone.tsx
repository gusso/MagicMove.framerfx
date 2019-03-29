import * as React from 'react'
// import { ConstraintValues } from './_Constraints'
import { useAnimation } from 'framer'

let childIndex = 0

export const Clone = ({
  element,
  render = false,
  isParent = false,
  parentSize = null,
  origin = null,
  stop = false,
  elementHook = [],
}) => {
  const [elements, setElements] = elementHook
  const animationControl = useAnimation()

  // console.log(elements)

  const handleProps = ({ element, render, isParent, parentSize, origin }) => {
    let props = {}
    const propElements = elements

    if (!render) {
      if (!propElements[childIndex]) propElements[childIndex] = {}
      propElements[childIndex][origin] = { ...element.props, parentSize }
      setElements(propElements)
    } else {
      const propsTransform = (Object as any).values(propElements).find(e => {
        return e[Object.keys(e)[0]].id == element.props.id
      })

      if (propsTransform) {
        const { initial } = propsTransform

        const events = Object.keys(propsTransform).filter(
          state => state != 'initial'
        )

        console.log(propsTransform)
        props['animate'] = animationControl

        // props['background'] = buildAnimation(
        //   initial.background,
        //   ...events.map(key => ({
        //     [key]: propsTransform[key].background,
        //   }))
        // )

        // props['animate'] = buildAnimation(
        //   initial.opacity,
        //   ...events.map(key => ({
        //     [key]: propsTransform[key].opacity,
        //   }))
        // )

        // console.log(origin)

        // props['rotation'] = buildAnimation(
        //   initial.rotation,
        //   ...events.map(key => ({
        //     [key]: propsTransform[key].rotation,
        //   }))
        // )

        // if (!isParent) {
        //   const constraintValues = {
        //     initial: ConstraintValues.toRect(
        //       ConstraintValues.fromProperties(initial),
        //       initial.parentSize
        //     ),
        //     ...events.reduce(
        //       (object, key) => ({
        //         ...object,
        //         [key]: ConstraintValues.toRect(
        //           ConstraintValues.fromProperties(propsTransform[key]),
        //           propsTransform[key].parentSize
        //         ),
        //       }),
        //       {}
        //     ),
        //   }

        //   props['bottom'] = null
        //   props['right'] = null

        //   props['top'] = buildAnimation(
        //     constraintValues.initial.y,
        //     ...events.map(key => ({
        //       [key]: constraintValues[key].y,
        //     }))
        //   )

        //   props['left'] = buildAnimation(
        //     constraintValues.initial.x,
        //     ...events.map(key => ({
        //       [key]: constraintValues[key].x,
        //     }))
        //   )

        //   props['width'] = buildAnimation(
        //     constraintValues.initial.width,
        //     ...events.map(key => ({
        //       [key]: constraintValues[key].width,
        //     }))
        //   )

        //   props['height'] = buildAnimation(
        //     constraintValues.initial.height,
        //     ...events.map(key => ({
        //       [key]: constraintValues[key].height,
        //     }))
        //   )
        // }
      }
    }

    return props
  }

  if (isParent) childIndex = 0
  childIndex++
  let modProps = {}

  if (element.type['name'] == 'Frame' && !stop) {
    modProps = handleProps({
      element,
      render,
      isParent,
      parentSize,
      origin,
      stop,
    })
  } else {
    stop = true
  }

  return React.cloneElement(
    element as React.ReactElement<any>,
    modProps,
    React.Children.map(element.props.children, child => {
      return (
        <Clone
          element={child}
          render={render}
          parentSize={ConstraintValues.toSize(
            ConstraintValues.fromProperties(element.props),
            parentSize
          )}
          origin={origin}
          stop={stop}
          elementHook={[elements, setElements]}
        />
      )
    })
  )
}
