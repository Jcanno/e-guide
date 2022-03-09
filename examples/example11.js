import { generatorEle } from './utils.js'
import { guide } from '../es/index.js'

export function showExample11() {
  generatorEle(
    'button',
    '遮罩层-弹出层-步骤',
    function () {
      guide([
        {
          element: document.getElementById('guide-mask-popover-step'),
          options: {
            popover: {
              title: '这是标题',
              content: '你好',
              position: 'top',
              closeable: false,
            },
          },
        },
        {
          element: '#guide-mask-popover-mix',
          options: {
            popover: {
              title: '这是标题',
              content: '你好',
              position: 'top',
            },
          },
        },
        {
          element: '#guide-popover-position-btn-box',
          options: {
            popover: {
              title: '这是标题',
              content: '你好',
              position: 'top',
              withAnimation: false,
            },
          },
        },
      ])
    },
    document.querySelector('#guide-mask-popover-step'),
  )
}
