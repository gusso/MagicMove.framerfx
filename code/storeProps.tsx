let childIndex = 0

export const storeProps = (sources, setElements) => {
  let newElements = {}

  const process = (element, source, isParent = false) => {
    const { children } = element.props

    if (isParent) childIndex = 0
    if (!newElements[childIndex]) newElements[childIndex] = {}
    newElements[childIndex][source] = { ...element.props }

    childIndex++

    if (children.length) {
      children.forEach(child => {
        process(child, source)
      })
    }
  }

  sources.forEach(source => {
    if (!!source.element) process(source.element, source.name, true)
  })

  setElements(newElements)
}
