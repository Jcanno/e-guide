import { generatorEle, wait } from './utils.js'
import { guide } from '../es/index.js'

export function showExample15() {
  generatorEle(
    'button',
    '遮罩层-弹出层-展示一次',
    function () {
      const { setStepTo } = guide(
        [
          {
            element: '#guide-animation',
            options: {
              popover: {
                title: '这是标题',
                content: '你好',
                position: 'bottom',
                control: true,
              },
            },
          },
          {
            element: '#guide-find-element',
            options: {
              popover: {
                title: '这是标题',
                content: '你好',
                position: 'bottom',
              },
              // popover: null
              // mask: null
            },
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
              mask: {},
            },
          },
          {
            element: '#guide-mask-popover-random-step-box',
            options: {
              popover: {
                title: '这是标题',
                content: '你好',
                position: 'top',
              },
              mask: null,
              // mask: {
              // }
            },
          },
        ],
        {
          stepGuideId: 'guide-id12',
          showOnce: true,
        },
      )
    },
    document.querySelector('#guide-mask-popover-show-once-box'),
  )
}
