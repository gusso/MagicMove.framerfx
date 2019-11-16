import { Color } from 'framer'

export const get = {
  opacity: value => opacity(value),
  radius: value => radius(value),
  shadow: value => shadow(value),
  bgColor: value => bgColor(value),
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
    .split(' ')
    .map(n => (n.includes('px') ? n : n + 'px'))
    .join(' ')
}

const shadow = shadows => {
  if (shadows == undefined) {
    return Array(4)
      .fill('0px')
      .concat('rgba(0,0,0,0)')
      .join(' ')
  } else {
    const shadowArray = shadows.split(/, (?=-?\d+px)|, (?=inset -?\d+px)/)
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

const color = value => {
  const hasColor = / [a-z].*?\)/.exec(value)

  let color =
    value == undefined ? 'transparent' : hasColor ? hasColor[0] : value

  return Color.toString(Color(color))
}

const bgColor = background => {
  let color1 = 'transparent'
  let color2 = 'transparent'
  let angle = '0'

  if (background != null) {
    color1 = background.stops
      ? background.stops[0].value
      : background.initialValue
      ? background.initialValue
      : background
    color2 = background.stops
      ? background.stops[1].value
      : background.initialValue
      ? background.initialValue
      : background
    angle = background.angle ? background.angle : '0'
  }

  return `linear-gradient(${angle}deg, ${color(color1)}, ${color(color2)})`
}
