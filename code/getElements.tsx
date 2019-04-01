import { isFrame } from './utils'

let i = 0

export const getElements = (sources, setElements) => {
  const elements = {}

  const addElementProps = (
    element,
    source,
    isParent = false,
    parentSize = null
  ) => {
    if (isFrame(element)) {
      const { children } = element.props
      const { width, height } = element.props.constraints
      if (isParent) i = 0

      if (!elements[i]) elements[i] = {}
      elements[i][source] = { ...element.props, parentSize }
      i++

      if (children.length)
        children.forEach(child => {
          addElementProps(child, source, false, { width, height })
        })
    }
  }

  sources.forEach(source => {
    if (!!source.element) addElementProps(source.element, source.name, true)
  })

  setElements(elements)
}
