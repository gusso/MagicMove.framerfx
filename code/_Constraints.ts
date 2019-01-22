// Forked from /src/render/types/Constraints.ts

import { Rect, Size, Animatable } from 'framer'

export enum DimensionType {
  FixedNumber,
  Percentage,
  Auto,
  FractionOfFreeSpace,
}

export namespace ConstraintMask {
  export const quickfix = constraints => {
    if (constraints.fixedSize) {
      constraints.widthType = DimensionType.FixedNumber
      constraints.heightType = DimensionType.FixedNumber
      constraints.aspectRatio = null
    }

    if (isFiniteNumber(constraints.aspectRatio)) {
      if (
        (constraints.left && constraints.right) ||
        (constraints.top && constraints.bottom)
      ) {
        constraints.widthType = DimensionType.FixedNumber
        constraints.heightType = DimensionType.FixedNumber
      }
      if (
        constraints.left &&
        constraints.right &&
        constraints.top &&
        constraints.bottom
      ) {
        constraints.bottom = false
      }
      if (
        constraints.widthType !== DimensionType.FixedNumber &&
        constraints.heightType !== DimensionType.FixedNumber
      ) {
        constraints.heightType = DimensionType.FixedNumber
      }
    }

    if (constraints.left && constraints.right) {
      constraints.widthType = DimensionType.FixedNumber

      if (constraints.fixedSize) {
        constraints.right = false
      }
    }
    if (constraints.top && constraints.bottom) {
      constraints.heightType = DimensionType.FixedNumber

      if (constraints.fixedSize) {
        constraints.bottom = false
      }
    }

    return constraints
  }
}

const valueToDimensionType = (
  value: string | number | Animatable<number> | undefined,
) => {
  if (typeof value === 'string') {
    const trimmedValue = value.trim()
    if (trimmedValue === 'auto') return DimensionType.Auto
    if (trimmedValue.endsWith('fr')) return DimensionType.FractionOfFreeSpace
    if (trimmedValue.endsWith('%')) return DimensionType.Percentage
  }
  return DimensionType.FixedNumber
}

export namespace ConstraintValues {
  export const fromProperties = props => {
    const {
      left,
      right,
      top,
      bottom,
      width,
      height,
      centerX,
      centerY,
      aspectRatio,
    } = props

    const constraints = ConstraintMask.quickfix({
      left: isFiniteNumber(left),
      right: isFiniteNumber(right),
      top: isFiniteNumber(top),
      bottom: isFiniteNumber(bottom),
      widthType: valueToDimensionType(width),
      heightType: valueToDimensionType(height),
      aspectRatio: aspectRatio || null,
    })

    let widthValue: number | null = null
    let heightValue: number | null = null

    let widthType = DimensionType.FixedNumber
    let heightType = DimensionType.FixedNumber

    if (
      constraints.widthType !== DimensionType.FixedNumber &&
      typeof width === 'string'
    ) {
      const parsedWidth = parseFloat(width)

      if (width.endsWith('fr')) {
        widthType = DimensionType.FractionOfFreeSpace
        widthValue = parsedWidth
      } else if (width === 'auto') {
        widthType = DimensionType.Auto
      } else {
        widthType = DimensionType.Percentage
        widthValue = parsedWidth / 100
      }
    } else if (width !== undefined && typeof width !== 'string') {
      widthValue = Animatable.getNumber(width)
    }

    if (
      constraints.heightType !== DimensionType.FixedNumber &&
      typeof height === 'string'
    ) {
      const parsedHeight = parseFloat(height)

      if (height.endsWith('fr')) {
        heightType = DimensionType.FractionOfFreeSpace
        heightValue = parsedHeight
      } else if (height === 'auto') {
        heightType = DimensionType.Auto
      } else {
        heightType = DimensionType.Percentage
        heightValue = parseFloat(height) / 100
      }
    } else if (height !== undefined && typeof height !== 'string') {
      heightValue = Animatable.getNumber(height)
    }

    let centerAnchorX = 0.5
    let centerAnchorY = 0.5
    if (centerX) {
      centerAnchorX = parseFloat(centerX) / 100
    }
    if (centerY) {
      centerAnchorY = parseFloat(centerY) / 100
    }

    return {
      left: constraints.left ? Animatable.getNumber(left) : null,
      right: constraints.right ? Animatable.getNumber(right) : null,
      top: constraints.top ? Animatable.getNumber(top) : null,
      bottom: constraints.bottom ? Animatable.getNumber(bottom) : null,
      widthType,
      heightType,
      width: widthValue,
      height: heightValue,
      aspectRatio: constraints.aspectRatio || null,
      centerAnchorX: centerAnchorX,
      centerAnchorY: centerAnchorY,
    }
  }

  export const toSize = (values, parentSize: Size | null | undefined): Size => {
    let width: number | null = null
    let height: number | null = null

    const parentWidth = parentSize
      ? Animatable.getNumber(parentSize.width)
      : null
    const parentHeight = parentSize
      ? Animatable.getNumber(parentSize.height)
      : null

    const hOpposingPinsOffset = pinnedOffset(values.left, values.right)

    if (parentWidth && isFiniteNumber(hOpposingPinsOffset)) {
      width = parentWidth - hOpposingPinsOffset
    } else if (isFiniteNumber(values.width)) {
      switch (values.widthType) {
        case DimensionType.FixedNumber:
          width = values.width
          break
        case DimensionType.FractionOfFreeSpace:
          width = 0
          break
        case DimensionType.Percentage:
          if (parentWidth) {
            width = parentWidth * values.width
          }
          break
      }
    }

    const vOpposingPinsOffset = pinnedOffset(values.top, values.bottom)

    if (parentHeight && isFiniteNumber(vOpposingPinsOffset)) {
      height = parentHeight - vOpposingPinsOffset
    } else if (isFiniteNumber(values.height)) {
      switch (values.heightType) {
        case DimensionType.FixedNumber:
          height = values.height
          break
        case DimensionType.FractionOfFreeSpace:
          height = 0
          break
        case DimensionType.Percentage:
          if (parentHeight) {
            height = parentHeight * values.height
          }
          break
      }
    }

    return sizeAfterApplyingDefaultsAndAspectRatio(width, height, values)
  }

  export const toRect = (values, parentSize: Size | null): Rect => {
    let x = values.left || 0
    let y = values.top || 0
    let width: number | null = null
    let height: number | null = null

    const parentWidth = parentSize
      ? Animatable.getNumber(parentSize.width)
      : null
    const parentHeight = parentSize
      ? Animatable.getNumber(parentSize.height)
      : null

    const hOpposingPinsOffset = pinnedOffset(values.left, values.right)

    if (parentWidth && isFiniteNumber(hOpposingPinsOffset)) {
      width = parentWidth - hOpposingPinsOffset
    } else if (isFiniteNumber(values.width)) {
      switch (values.widthType) {
        case DimensionType.FixedNumber:
          width = values.width
          break
        case DimensionType.FractionOfFreeSpace:
          width = 0
          break
        case DimensionType.Percentage:
          if (parentWidth) {
            width = parentWidth * values.width
          }
          break
      }
    }

    const vOpposingPinsOffset = pinnedOffset(values.top, values.bottom)

    if (parentHeight && isFiniteNumber(vOpposingPinsOffset)) {
      height = parentHeight - vOpposingPinsOffset
    } else if (isFiniteNumber(values.height)) {
      switch (values.heightType) {
        case DimensionType.FixedNumber:
          height = values.height
          break
        case DimensionType.FractionOfFreeSpace:
          height = 0
          break
        case DimensionType.Percentage:
          if (parentHeight) {
            height = parentHeight * values.height
          }
          break
      }
    }

    const sizeWithDefaults = sizeAfterApplyingDefaultsAndAspectRatio(
      width,
      height,
      values,
    )
    width = sizeWithDefaults.width
    height = sizeWithDefaults.height

    if (values.left !== null) {
      x = values.left
    } else if (parentWidth && values.right !== null) {
      x = parentWidth - values.right - width
    } else if (parentWidth) {
      x = values.centerAnchorX * parentWidth - width / 2
    }

    if (values.top !== null) {
      y = values.top
    } else if (parentHeight && values.bottom !== null) {
      y = parentHeight - values.bottom - height
    } else if (parentHeight) {
      y = values.centerAnchorY * parentHeight - height / 2
    }

    const f = { x, y, width, height }
    return f
  }
}

const sizeAfterApplyingDefaultsAndAspectRatio = (
  width: number | null,
  height: number | null,
  values,
): Size => {
  let w = isFiniteNumber(width) ? width : 100
  let h = isFiniteNumber(height) ? height : 100

  if (isFiniteNumber(values.aspectRatio)) {
    if (isFiniteNumber(values.left) && isFiniteNumber(values.right)) {
      h = w / values.aspectRatio
    } else if (isFiniteNumber(values.top) && isFiniteNumber(values.bottom)) {
      w = h * values.aspectRatio
    } else if (values.widthType !== DimensionType.FixedNumber) {
      h = w / values.aspectRatio
    } else {
      w = h * values.aspectRatio
    }
  }

  return {
    width: w,
    height: h,
  }
}

const pinnedOffset = (start: number | null, end: number | null) => {
  if (!isFiniteNumber(start) || !isFiniteNumber(end)) return null
  return start + end
}

const isFiniteNumber = value => {
  return typeof value === 'number' && isFinite(value)
}
