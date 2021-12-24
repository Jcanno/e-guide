import { generatorEle  } from './utils.js'
import { guide } from '../es/index.js'

export function showExample12() {
  let btnSetStepTo = () => {}
  generatorEle('button', '遮罩层-弹出层-任意步骤', function() {
    const { setStepTo, getCurrrentIndex } = guide([
      {
        element: '#guide-animation',
        options: {
          popover: {
            title: '这是标题',
            content: '你好',
            position: 'bottom',
          },
          mask: {
            highlightDisabled: true
          }
        }
      },
      {
        element: '#guide-find-element',
        options: {
          popover: {
            title: '这是标题',
            content: '你好',
            position: 'top'
          },
          mask: {
            highlightDisabled: true
          }
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
          mask: {
            highlightDisabled: true
          }
          // mask: {
          // }
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
          mask: {
            highlightDisabled: false
          }
          // mask: {
          // }
        }
      },
    ])

    btnSetStepTo = setStepTo
  }, document.querySelector('#guide-mask-popover-random-step-box'))

  generatorEle('button', '回到第一步', async function() {

    btnSetStepTo(0)
  }, document.querySelector('#guide-mask-popover-random-step-box'), true)

}
