import { generatorEle, wait  } from './utils.js'
import { guide } from '../es/index.js'

export function showExample16() {
  generatorEle('button', '遮罩层-弹出层-不再提示', function() {
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
          scrollDisabled: true,
          beforeClose: (index) => {
            console.log(index);

          },
        }
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
    ], {
      // beforeClose: (index) => {
      //   console.log(index);

      // },
      stepGuideId: 'guide-id112',
      noMoreShow: true,
      noMoreText: '不再提醒'
    })

  }, document.querySelector('#guide-mask-popover-no-more-show-box'))
}
