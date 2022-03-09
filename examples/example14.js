import { generatorEle, wait } from './utils.js'
import { guide } from '../es/index.js'

export function showExample14() {
  generatorEle(
    'button',
    '遮罩层-弹出层-异步控制',
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
          onNextStep: async (currentStepIndex) => {
            console.log('next', currentStepIndex)
            if (currentStepIndex === 0) {
              await wait(1000)
            }
          },
          onPrevStep: async (currentStepIndex) => {
            console.log('prev', currentStepIndex)
            if (currentStepIndex === 1) {
              await wait(1000)
            }
          },
        },
      )
    },
    document.querySelector('#guide-mask-popover-step-hook-box'),
  )
}
