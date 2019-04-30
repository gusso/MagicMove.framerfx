import { isFrame } from './utils'
import { calculateSize } from './NewConstraints'

export const getElements = (sources, setElements) => {
  const elements = {}
  let i = 0

  const addElementProps = (
    element,
    source,
    isParent = false,
    parentSize = null
  ) => {
    if (isFrame(element)) {
      const { children } = element.props
      const { width, height } = calculateSize(element.props, parentSize)
      if (isParent) i = 0

      if (!elements[i]) elements[i] = {}
      if (!elements[i][source]) elements[i][source] = []
      elements[i][source].push({ ...element.props, parentSize })

      i++

      if (children.length)
        children.forEach(child => {
          addElementProps(child, source, false, { width, height })
        })
    }
  }

  sources.forEach(source => {
    if (!!source.elements.length)
      source.elements.forEach(element => {
        addElementProps(element, source.name, true)
      })
  })

  setElements(elements)
}
