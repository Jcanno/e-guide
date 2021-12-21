import { getPadding, safe } from './utils'
import { POPOVERID, POPOVERMARGIN } from './utils/constants'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
// import Guide from './utils/my-jsx'
import * as Guide from 'use-jsx'

export type PopoverProps = {
  title?: string
  content?: string | Element
  position?: 'bottom' | 'top' | 'left' | 'right'
  closeable?: boolean
  withAnimation?: boolean
  control?: boolean
  showStepTip?: boolean

  sizes?: Partial<DOMRect>
  show?: boolean
  maskPadding?: number | [number, number]
  setStepTo?: (index: number, mathAdd: boolean) => void
  getCurrentStepIndex?: () => number
  stepLength?: number
  close?: () => void
  noMoreShow?: boolean
  noMoreText?: string
  onNoMoreShowClick?: () => void
}

export function Popover({
  closeable = true,
  position = 'bottom',
  title = '',
  content = '',
  withAnimation = true,
  control = true,
  showStepTip = true,

  sizes = {},
  close,
  maskPadding,
  show,
  setStepTo,
  getCurrentStepIndex,
  stepLength = 0,
  onNoMoreShowClick,
  noMoreText = '不再提示',
  noMoreShow = true,
}: PopoverProps) {
  const [py, px] = getPadding(maskPadding)
  const animation = withAnimation
    ? {
        transition: 'all 1s',
      }
    : null

  const getBorderStyle = (position: 'bottom' | 'top' | 'left' | 'right') => {
    let result = null

    switch (position) {
      case 'top':
        result = {
          bottom: '-10px',
          'border-color': '#fff transparent transparent',
        }
        break
      case 'bottom':
        result = {
          top: '-10px',
          'border-color': 'transparent transparent #fff',
        }
        break
      case 'right':
        result = {
          top: '10px',
          left: '-10px',
          'border-color': 'transparent #fff transparent transparent',
        }
        break
      case 'left':
        result = {
          top: '10px',
          right: '-10px',
          'border-color': 'transparent transparent transparent #fff',
        }
        break
      default:
        break
    }

    return result
  }

  const useDom = (dom: HTMLElement) => {
    const domRect = dom.getBoundingClientRect()
    const result: any = {}

    switch (position) {
      case 'bottom':
      case 'top':
        result.left = safe(sizes.left - px) || 0
        result.top = {
          bottom: safe(sizes.top + sizes.height + py + POPOVERMARGIN) || 0,
          top: safe(sizes.top - py - domRect.height - POPOVERMARGIN) || 0,
        }[position]
        break
      case 'left':
      case 'right':
        result.top = safe(sizes.top - py) || 0
        result.left = {
          left: safe(sizes.left - px - domRect.width - POPOVERMARGIN) || 0,
          right: safe(sizes.left + sizes.width + px + POPOVERMARGIN) || 0,
        }[position]
        break
      default:
        break
    }

    Object.keys(result).forEach((key) => {
      result[key] = `${result[key]}px`

      dom.style.setProperty(key, result[key])
    })
  }

  const allowClick = (next: boolean) => {
    const currentIndex = getCurrentStepIndex()

    return next ? currentIndex !== stepLength - 1 : currentIndex !== 0
  }

  const setNextOrPrevStep = (next: boolean) => {
    if (allowClick(next)) {
      setStepTo(next ? 1 : -1, true)
    }
  }

  const showControl = !!stepLength && control

  const getControlBtn = (next: boolean, allowClick: boolean) => {
    return (
      <button
        style={{
          padding: '0px',
          border: '0px',
          background: 'none',
          cursor: allowClick ? 'pointer' : 'not-allowed',
        }}
        onclick={() => setNextOrPrevStep(next)}
      >
        <svg
          viewBox="0 0 18.4 14.4"
          style={{
            color: allowClick ? 'rgb(100, 100, 100)' : 'rgb(202, 204, 206)',
            width: '16px',
            height: '12px',
          }}
        >
          <path
            d={next ? 'M17 7.2H1M10.8 1L17 7.2l-6.2 6.2' : 'M1.4 7.2h16M7.6 1L1.4 7.2l6.2 6.2'}
            fill="none"
            stroke="currentcolor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-miterlimit="10"
          ></path>
        </svg>
      </button>
    )
  }

  const onNoMore = () => {
    onNoMoreShowClick && onNoMoreShowClick()
    onClose()
  }

  const controlEle = showControl ? (
    <div
      style={{
        display: 'flex',
        'justify-content': 'space-between',
        'align-items': 'center',
        'margin-top': '10px',
      }}
    >
      {getControlBtn(false, allowClick(false))}
      {noMoreShow ? (
        <div
          style={{
            display: 'flex',
            'justify-content': 'end',
            padding: '5px 10px',
            'background-color': '#e3eaef',
            'border-color': '#e3eaef',
            'box-shadow': '0 2px 6px #e6ecf1',
            color: '#191d21',
            'border-radius': '0.25rem',
            cursor: 'pointer',
            'font-size': '14px',
          }}
          onclick={onNoMore}
        >
          <span>{noMoreText}</span>
        </div>
      ) : null}
      {getControlBtn(true, allowClick(true))}
    </div>
  ) : null
  const onClose = () => {
    close && close()
  }

  const closeBtn = closeable ? (
    <button
      style={{
        padding: '0px',
        border: '0px',
        background: 'none',
        cursor: 'pointer',
        position: 'absolute',
        top: '5px',
        right: '10px',
        width: '9px',
        height: '9px',
        color: 'rgb(94, 94, 94)',
      }}
      onclick={onClose}
    >
      <svg viewBox="0 0 9.1 9.1">
        <path
          d="M5.9 4.5l2.8-2.8c.4-.4.4-1 0-1.4-.4-.4-1-.4-1.4 0L4.5 3.1 1.7.3C1.3-.1.7-.1.3.3c-.4.4-.4 1 0 1.4l2.8 2.8L.3 7.4c-.4.4-.4 1 0 1.4.2.2.4.3.7.3s.5-.1.7-.3L4.5 6l2.8 2.8c.3.2.5.3.8.3s.5-.1.7-.3c.4-.4.4-1 0-1.4L5.9 4.5z"
          stroke="currentcolor"
        ></path>
      </svg>
    </button>
  ) : null

  return (
    <>
      <div
        id={POPOVERID}
        style={{
          position: 'fixed',
          opacity: !show ? 0 : 1,
          display: show ? 'block' : 'none',
          'background-color': '#fff',
          'max-width': '400px',
          'min-width': '250px',
          'z-index': 999999999,
          'border-radius': '5px',
          padding: '15px',
          color: '#2d2d2d',
          'word-break': 'break-all',
          'box-shadow': '0 0.5em 3em rgba(0, 0, 0, 0.3)',
          ...animation,
        }}
        useDom={useDom}
      >
        <div
          style={{
            'border-style': 'solid',
            'border-width': '5px',
            content: '',
            position: 'absolute',
            ...getBorderStyle(position),
          }}
        ></div>
        <div
          style={{
            margin: '0 0 5px',
            'line-height': 1.5,
            'font-weight': 700,
            font: '19px/normal sans-serif',
          }}
        >
          {title}
        </div>
        <div
          style={{
            'line-height': 1.5,
            'font-weight': 400,
            font: '14px/normal sans-serif',
          }}
        >
          {content}
        </div>

        {controlEle}
        {closeBtn}
        {!!stepLength && showStepTip ? (
          <div
            style={{
              position: 'absolute',
              top: '-12px',
              left: '-10px',
              background: '#007aff',
              height: '25px',
              padding: '0px 10px',
              'border-radius': '10px',
              color: 'white',
              'text-align': 'center',
              'font-size': '12px',
              'line-height': 2,
            }}
          >{`${getCurrentStepIndex() + 1} / ${stepLength}`}</div>
        ) : null}
      </div>
    </>
  )
}
