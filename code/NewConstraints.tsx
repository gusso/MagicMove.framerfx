import * as React from 'react'
import { Size, Rect } from 'framer'
import {
  UserConstraintValues,
  DimensionType,
  ConstraintMask,
  valueToDimensionType,
  ConstraintValues,
} from './Constraints'
import { isFiniteNumber } from './utils'

// Constraint system that can switch between DOM and Constraint layout

export interface PositionProperties {
  top: number | string
  right: number | string
  bottom: number | string
  left: number | string
  center: 'x' | 'y' | boolean
}

export interface SizeProperties {
  width: number | string
  height: number | string
  size: number | string
}

export interface LayoutProperties
  extends PositionProperties,
    SizeProperties {}

export interface CustomConstraintProperties {
  /**
   * Aspect Ratio to keep when resizing
   * @public
   */
  aspectRatio?: number | null

  /**
   * Used for Text and Graphics containers
   * @public
   */
  autoSize?: boolean

  /**
   * Use Vekter constraint layout system, disable DOM layout
   * @public
   */
  enabled: boolean

  intrinsicWidth?: number
  intrinsicHeight?: number
}

export interface ConstraintConfiguration {
  /** @interal */
  _constraints: CustomConstraintProperties
}

export interface NewConstraintProperties
  extends Partial<LayoutProperties>,
    ConstraintConfiguration {}

function isString(t: any): t is string {
  return typeof t === 'string'
}

// The old constraint system does not allow for strings, so this function checks if the layout props contain string values
// In certain centering cases we can convert the strings to the old constraint system, so that logic is captured here
function containsInvalidStringValues(
  props: Partial<NewConstraintProperties>
): boolean {
  const { left, right, top, bottom, center } = props
  // We never allow right or bottom to be strings
  if ([right, bottom].some(isString)) {
    return true
  }
  // Only allow a string for left, if it is part of the centering logic
  if (isString(left) && (!center || center === 'y')) {
    // We are not centering or only centering in the opposite direction
    return true
  }
  // Only allow a string for top, if it is part of the centering logic
  if (isString(top) && (!center || center === 'x')) {
    // We are not centering or only centering in the opposite direction
    return true
  }
  return false
}

/** @internal */
export function constraintsEnabled(
  props: Partial<NewConstraintProperties>
): props is NewConstraintProperties {
  const { _constraints } = props

  if (!_constraints) {
    return false
  }

  if (containsInvalidStringValues(props)) {
    return false
  }

  return _constraints.enabled
}

function sizeFromFiniteNumberProps(
  props: Partial<NewConstraintProperties>
): Size | null {
  const { size } = props

  let { width, height } = props

  if (isFiniteNumber(size)) {
    if (width === undefined) {
      width = size
    }
    if (height === undefined) {
      height = size
    }
  }

  if (isFiniteNumber(width) && isFiniteNumber(height)) {
    return {
      width: width,
      height: height,
    }
  }

  return null
}

function rectFromFiniteNumberProps(
  props: Partial<NewConstraintProperties>
): Rect | null {
  const size = sizeFromFiniteNumberProps(props)

  if (size === null) {
    return null
  }

  const { left, top } = props

  if (isFiniteNumber(left) && isFiniteNumber(top)) {
    return {
      x: left,
      y: top,
      ...size,
    }
  }

  return null
}

export function calculateSize(
  props: Partial<
    NewConstraintProperties & Partial<{ size: number | string }>
  >,
  parentSize: ParentSize
): Size | null {
  const constraintValues = getConstraintValues(props)
  const pixelAlign = true
  const rect = ConstraintValues.toRect(
    constraintValues,
    deprecatedParentSize(parentSize),
    null,
    pixelAlign
  )

  return { width: rect.width, height: rect.height }
}

export function calculateRect(
  props: Partial<
    NewConstraintProperties & Partial<{ size: number | string }>
  >,
  parentSize: ParentSize,
  pixelAlign: boolean = true
): Rect | null {
  const constraintValues = getConstraintValues(props)

  return ConstraintValues.toRect(
    constraintValues,
    deprecatedParentSize(parentSize),
    null,
    pixelAlign
  )
}

function getConstraintValues(
  props: NewConstraintProperties
): UserConstraintValues {
  const { left, right, top, bottom, center, _constraints, size } = props
  let { width, height } = props
  if (width === undefined) {
    width = size
  }
  if (height === undefined) {
    height = size
  }
  const { aspectRatio, autoSize } = _constraints
  const constraintMask = ConstraintMask.quickfix({
    left: isFiniteNumber(left),
    right: isFiniteNumber(right),
    top: isFiniteNumber(top),
    bottom: isFiniteNumber(bottom),
    widthType: valueToDimensionType(width),
    heightType: valueToDimensionType(height),
    aspectRatio: aspectRatio || null,
    fixedSize: autoSize === true,
  })

  let widthValue: number | null = null
  let heightValue: number | null = null

  let widthType = DimensionType.FixedNumber
  let heightType = DimensionType.FixedNumber

  if (
    constraintMask.widthType !== DimensionType.FixedNumber &&
    typeof width === 'string'
  ) {
    const parsedWidth = parseFloat(width)

    if (width.endsWith('fr')) {
      widthType = DimensionType.FractionOfFreeSpace
      widthValue = parsedWidth
    } else if (width === 'auto') {
      widthType = DimensionType.Auto
    } else {
      // Percentage
      widthType = DimensionType.Percentage
      widthValue = parsedWidth / 100
    }
  } else if (width !== undefined && typeof width !== 'string') {
    widthValue = width
  }

  if (
    constraintMask.heightType !== DimensionType.FixedNumber &&
    typeof height === 'string'
  ) {
    const parsedHeight = parseFloat(height)

    if (height.endsWith('fr')) {
      heightType = DimensionType.FractionOfFreeSpace
      heightValue = parsedHeight
    } else if (height === 'auto') {
      heightType = DimensionType.Auto
    } else {
      // Percentage
      heightType = DimensionType.Percentage
      heightValue = parseFloat(height) / 100
    }
  } else if (height !== undefined && typeof height !== 'string') {
    heightValue = height
  }

  let centerAnchorX = 0.5
  let centerAnchorY = 0.5
  // XXX: is this
  if (center === true || center === 'x') {
    constraintMask.left = false
    if (typeof left === 'string') {
      centerAnchorX = parseFloat(left) / 100
    }
  }
  if (center === true || center === 'y') {
    constraintMask.top = false
    if (typeof top === 'string') {
      centerAnchorY = parseFloat(top) / 100
    }
  }

  return {
    // Because we check isFiniteNumber when creating the masks,
    // We know that left, right, top and bottom are numbers if the mask is true for the corresponding value
    // We need to cast this because typescript does not understand that
    left: constraintMask.left ? (left as number) : null,
    right: constraintMask.right ? (right as number) : null,
    top: constraintMask.top ? (top as number) : null,
    bottom: constraintMask.bottom ? (bottom as number) : null,
    widthType,
    heightType,
    width: widthValue,
    height: heightValue,
    aspectRatio: constraintMask.aspectRatio || null,
    centerAnchorX: centerAnchorX,
    centerAnchorY: centerAnchorY,
  }
}

export enum ParentSizeState {
  Unknown, // There is no known ParentSize
  Disabled, // ParentSize should not be used for layout
}
export type ParentSize = Size | ParentSizeState

// Only exported for use in class components, otherwise use one of the hooks below
export const ConstraintsContext = React.createContext<{ size: ParentSize }>({
  size: ParentSizeState.Unknown,
})

export function deprecatedParentSize(parentSize: ParentSize): Size | null {
  if (
    parentSize === ParentSizeState.Unknown ||
    parentSize === ParentSizeState.Disabled
  ) {
    return null
  }
  return parentSize
}

export function useParentSize(): ParentSize {
  return React.useContext(ConstraintsContext).size
}

const ProvideParentSize: React.FunctionComponent<{
  parentSize: ParentSize
}> = props => {
  const currentParentSize = useParentSize()
  const { parentSize, children } = props
  if (currentParentSize === ParentSizeState.Disabled) {
    return children ? <>{children}</> : null
  }

  return (
    <ConstraintsContext.Provider value={{ size: parentSize }}>
      {children}
    </ConstraintsContext.Provider>
  )
}

export const ConsumeParentSize = ConstraintsContext.Consumer

export function useProvideParentSize(
  node: React.ReactNode,
  parentSize: ParentSize
): React.ReactNode {
  return (
    <ProvideParentSize parentSize={parentSize}>{node}</ProvideParentSize>
  )
}

export function useConstraints(
  props: Partial<NewConstraintProperties>
): Rect | null {
  const parentSize = useParentSize()
  return calculateRect(props, parentSize)
}
