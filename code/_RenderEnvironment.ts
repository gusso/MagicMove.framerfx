// Forked from /src/render/types/RenderEnvironment.ts

export enum RenderTarget {
  canvas,
  export,
  preview,
}

const windowKey = 'FramerRenderEnvironment'

let windowEnvironment

if (window[windowKey]) {
  windowEnvironment = window[windowKey]
} else {
  windowEnvironment = {
    imageBaseURL: '',
    target: RenderTarget.preview,
    zoom: 1,
  }
  window[windowKey] = windowEnvironment
}

export const RenderEnvironment = windowEnvironment
