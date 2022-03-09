import { generatorEle } from './utils.js'
import { guide } from '../es/index.js'

export function showExample3() {
  generatorEle(
    'button',
    '遮罩层-背景色',
    function () {
      guide('#guide-custom-bg-mask', {
        mask: {
          bgColor: 'red',
        },
        popover: null,
      })
    },
    document.querySelector('#guide-custom-bg-mask'),
  )
}
