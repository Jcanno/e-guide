import { generatorEle } from './utils.js'
import { guide } from '../es/index.js'

export function showExample1() {
  generatorEle(
    'button',
    '遮罩层-无动画',
    function () {
      guide('#guide-animation', {
        mask: {
          withAnimation: false,
        },
        popover: null,
      })
    },
    document.querySelector('#guide-animation-btn-box'),
    true,
  )

  const demoH1 = document.querySelector('#guide-animation')
  generatorEle(
    'button',
    '遮罩层-动画',
    function () {
      guide(demoH1, {
        mask: {
          withAnimation: true,
        },
        popover: null,
      })
    },
    document.querySelector('#guide-animation-btn-box'),
    true,
  )
}
