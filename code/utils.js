export const isFiniteNumber = value =>
  typeof value === 'number' && isFinite(value)

export const isFrame = element => element.type.name == 'Frame'
