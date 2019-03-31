import { Color } from 'framer'

export const normalizeRadius = radius => {
  if (radius == undefined) {
    return Array(4)
      .fill('0px')
      .join(' ')
  }

  if (radius.split('px').length == 2) {
    return Array(4)
      .fill(radius)
      .join(' ')
  }

  return radius
}

export const normalizeShadow = shadows => {
  if (shadows == undefined) {
    return Array(4)
      .fill('0px')
      .concat('rgba(0,0,0,0)')
      .join(' ')
  } else {
    const shadowArray = shadows.split(/, (?=[0-9]+px)/)
    const newShadows = []

    shadowArray.forEach(shadow => {
      const shadowProps = shadow.split('px ')

      newShadows.push(
        `${shadowProps[0]}px ${shadowProps[1]}px ${shadowProps[2]}px ${
          shadowProps[3]
        }px ${normalizeColor(shadowProps.pop())}`
      )
    })

    return newShadows.join(', ')
  }
}

export const normalizeBorder = border => {
  return `${border.borderWidth}px ${border.borderStyle} ${normalizeColor(
    border.borderColor
  )}`
}

export const normalizeColor = color => {
  return Color.toString(Color(color))
}
