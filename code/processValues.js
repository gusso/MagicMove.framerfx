import { Color } from 'framer'

export const get = {
  opacity: value => opacity(value),
  radius: value => radius(value),
  shadow: value => shadow(value),
  border: value => border(value),
  color: value => color(value),
}

const opacity = opacity => {
  if (opacity == undefined) {
    return 1
  }

  return opacity
}

const radius = radius => {
  if (radius == undefined)
    return Array(4)
      .fill('0px')
      .join(' ')

  if (radius.split('px').length == 2)
    return Array(4)
      .fill(radius)
      .join(' ')

  return radius
}

const shadow = shadows => {
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
        }px ${color(shadowProps.pop())}`
      )
    })

    return newShadows.join(', ')
  }
}

const border = border => {
  if (Object.entries(border).length == 0) {
    return `0px solid ${color('transparent')}`
  }

  return `${border.borderWidth}px ${border.borderStyle} ${color(
    border.borderColor
  )}`
}

const color = color => {
  if (color == undefined) {
    return Color.toString(Color('transparent'))
  }

  return Color.toString(Color(color))
}
