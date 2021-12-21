import { generatorEle  } from './utils.js'
import { guide } from '../es/index.js'

export function showExample13() {
  let btnSetStepTo = () => {}
  generatorEle('button', '遮罩层-弹出层-任意步骤2', function() {
    const { setStepTo } = guide([
      {
        element: '#guide-animation',
        options: {
          popover: {
            title: '这是标题',
            content: '你好',
            position: 'bottom',
            control: true
          },
          mask: null
        }
      },
      {
        element: '#guide-find-element',
        options: {
          popover: {
            title: '这是标题',
            content: '你好',
            position: 'bottom',
            control: false
          },
          // popover: null
          // mask: null
        }
      },
      {
        element: '#guide-popover-position-btn-box',
        options: {
          popover: {
            title: '这是标题',
            content: '你好',
            position: 'top',
          },
          // mask: null
          mask: {
          }
        }
      },
      {
        element: '#guide-mask-popover-random-step-box',
        options: {
          popover: {
            title: '这是标题',
            content: '你好',
            position: 'top',
          },
          mask: null
          // mask: {
          // }
        }
      },
    ])

    btnSetStepTo = setStepTo
  }, document.querySelector('#guide-only-mask-popover-step'))
}
