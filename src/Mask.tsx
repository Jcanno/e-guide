import { getWindow, getPadding, safe } from './utils'
import { CLIPID, MASKID } from './utils/constants'

export type MaskProps = {
  padding?: number | [number, number]
  withAnimation?: boolean
  closeable?: boolean
  bgColor?: string
  highlightDisabled?: boolean

  sizes?: Partial<DOMRect>
  close?: () => void
  show?: boolean
  setStepTo?: (index: number, mathAdd: boolean) => void
  getCurrentStepIndex?: () => number
  stepLength?: number
}

export function Mask({
  padding = 10,
  withAnimation = true,
  closeable = true,
  bgColor = 'rgb(0, 0, 0)',
  highlightDisabled = false,

  show,
  close,
  sizes,
  setStepTo,
  getCurrentStepIndex,
  stepLength = 0,
}: MaskProps) {
  const [py, px] = getPadding(padding)
  const { w: windowWidth, h: windowHeight } = getWindow()
  const width = safe(sizes?.width + px * 2)
  const height = safe(sizes?.height + py * 2)
  const top = safe(sizes?.top - py)
  const left = safe(sizes?.left - px)
  const animation = withAnimation
    ? {
        transition: 'all 0.4s',
      }
    : null

  const onMaskClick = () => {
    if (stepLength) {
      if (getCurrentStepIndex() === stepLength - 1) {
        closeable && close()
      } else {
        setStepTo(1, true)
      }
      return
    }

    closeable && close()
  }

  return (
    <div>
      <div
        id={MASKID}
        style={{
          opacity: !show ? 0 : 0.7,
          left: '0px',
          top: '0px',
          position: 'fixed',
          'z-index': 99999999,
          'pointer-events': 'none',
          color: bgColor,
          ...animation,
        }}
        onclick={onMaskClick}
      >
        <svg version="1.1" width={windowWidth} height={windowHeight}>
          <defs>
            <clipPath id={CLIPID}>
              <rect x={0} y={0} width={windowWidth} height={show ? top : 0} style={animation} />
              <rect
                x={0}
                y={show ? top : 0}
                width={show ? left : 0}
                height={show ? height : windowHeight}
                style={animation}
              />
              <rect
                x={show ? left + width : windowWidth}
                y={show ? top : 0}
                width={show ? safe(windowWidth - width - left) : 0}
                height={show ? height : windowHeight}
                style={animation}
              />
              <rect
                x={0}
                y={show ? top + height : windowHeight}
                width={windowWidth}
                height={show ? safe(windowHeight - height - top) : 0}
                style={animation}
              />
            </clipPath>
          </defs>
          <rect
            style={{
              x: 0,
              y: 0,
              width: `${windowWidth}px`,
              height: `${windowHeight}px`,
              fill: 'currentcolor',
              'pointer-events': 'auto',
              'clip-path': `url(#${CLIPID})`,
            }}
          />
        </svg>
      </div>
      {highlightDisabled ? (
        <div
          style={{
            position: 'fixed',
            left: `${left}px`,
            top: `${top}px`,
            width: `${width || 0}px`,
            height: `${height || 0}px`,
            opacity: 0,
          }}
        ></div>
      ) : null}
    </div>
  )
}
