import { generatorEle } from './utils.js'
import { guide } from '../es/index.js'

export function showExample5() {
  generatorEle(
    'button',
    '遮罩层-禁用滚动',
    function () {
      guide('#guide-scroll-disabled', {
        scrollDisabled: true,
        popover: null,
      })
    },
    document.querySelector('#guide-scroll-disabled'),
  )
}
