import { generatorEle, wait } from './utils.js'
import { guide } from '../es/index.js'

export function showExample4() {
  generatorEle(
    'button',
    '遮罩层-滚动查找元素',
    async function () {
      guide('#guide-animation', { scrollDisabled: true, popover: null })

      await wait(1000)
      guide('#guide-find-element', { scrollDisabled: true, popover: null })

      await wait(1500)

      guide('#guide-padding-box', { scrollDisabled: true, popover: null })

      await wait(1000)

      guide('#guide-mask-popover-random-step-box', { scrollDisabled: false, popover: null })
    },
    document.querySelector('#guide-find-element'),
  )
}
