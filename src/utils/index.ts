import { STORAGEKEY } from './constants'

export function safe(sum: number): number {
  return sum < 0 ? 0 : sum
}

export function getWindow(): { w: number; h: number } {
  const w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
  const h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
  return { w, h }
}

const defaultPadding = 10

export function getPadding(padding: number | [number, number] = defaultPadding) {
  if (Array.isArray(padding)) {
    return padding[0]
      ? [padding[0], padding[1] ? padding[1] : padding[0]]
      : [defaultPadding, defaultPadding]
  }
  return [padding, padding]
}

export function isInViewPort(sizes: Partial<DOMRect>) {
  const viewWidth = window.innerWidth || document.documentElement.clientWidth
  const viewHeight = window.innerHeight || document.documentElement.clientHeight
  const { top, right, bottom, left } = sizes

  return top >= 0 && left >= 0 && right <= viewWidth && bottom <= viewHeight
}

export const getRect = function getRect(element) {
  let rect = {
    bottom: 0,
    height: 0,
    left: 0,
    right: 0,
    top: 0,
    width: 0,
  }

  if (element) {
    const domRect = element.getBoundingClientRect()
    rect = {
      bottom: domRect.bottom,
      height: domRect.height,
      left: domRect.left,
      right: domRect.right,
      top: domRect.top,
      width: domRect.width,
    }
  }
  return rect
}

export const isDomElement = function (element: unknown) {
  return element && typeof element === 'object' && 'nodeType' in element
}

export const findTargetElement = function (target: string | Element) {
  let element: Element = null

  if (typeof target === 'string') {
    element = document.querySelector(target)
  } else if (isDomElement(target)) {
    element = target
  }

  return element
}

export class Event {
  events = {}

  on(
    eventType: string,
    fn: (...args: any[]) => any,
    source: Window | Document | Element,
    namespace = 'default',
  ) {
    if (source && source.addEventListener) {
      source.addEventListener(eventType, fn)
      this.events[namespace] = {
        ...this.events[namespace],
        [eventType]: fn,
      }
    }
  }

  bindOne(
    eventType: string,
    fn: (...args: any[]) => any,
    source: Window | Document | Element,
    namespace = 'default',
  ) {
    this.off(eventType, source, namespace)
    this.on(eventType, fn, source, namespace)
  }

  off(eventType: string, source: Window | Document | Element, namespace = 'default') {
    const event = this.events?.[namespace]?.[eventType]

    if (event && source && source.removeEventListener) {
      source.removeEventListener(eventType, event)
      delete this.events[namespace][eventType]
    }
  }
}

const setGuideStorage = (data: object) => {
  const dataStr = JSON.stringify(data)
  localStorage.setItem(STORAGEKEY, dataStr)
}

const getGuideStorage = () => {
  const dataStr = localStorage.getItem(STORAGEKEY)
  return JSON.parse(dataStr)
}

export const setStepGuidIdToStorage = (id: string, noMoreShow: boolean) => {
  if (!id) return
  const cacheGuideData = localStorage.getItem(STORAGEKEY)

  if (cacheGuideData) {
    try {
      const data = JSON.parse(cacheGuideData)

      data[id] = {
        noMoreShow,
      }
      setGuideStorage(data)
    } catch (error) {
      setGuideStorage({
        [id]: {
          noMoreShow,
        },
      })
    }
  } else {
    setGuideStorage({
      [id]: {
        noMoreShow,
      },
    })
  }
}

export const isCanShowGuideByStroage = (id: string) => {
  if (!id) return true

  const data = getGuideStorage()
  const item = data?.[id]

  return !item || !item.noMoreShow
}

export const noop = () => {}

export const getOriginScroll = () => document.documentElement.style.overflow

const HIDDEN_SCROLL = 'hidden'

export const setPageScroll = (scrollDisabled: boolean, scroll = '') => {
  document.documentElement.style.overflow = scrollDisabled ? HIDDEN_SCROLL : scroll
}
