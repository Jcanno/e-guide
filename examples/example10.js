import { generatorEle  } from './utils.js'
import { guide } from '../es/index.js'

export function showExample10() {
  generatorEle('button', '遮罩层-弹出层-混合', function() {
    guide('#guide-mask-popover-mix', {
      popover: {
        title: '这是标题',
        content: '你好',
        position: 'top',
        withAnimation: false
      },
      mask: {
        // closeable: false
        // withAnimation: false
        // bgColor: 'yellow'
      }
    })
  }, document.querySelector('#guide-mask-popover-mix-btn-box'), true)

  // const titleh1 = document.createElement('h1')
  // titleh1.textContent = "我是内容"
  generatorEle('button', '遮罩层-弹出层-混合2', function() {
    guide('#guide-popover-position-box div', {
      popover: {
        title: '这是标题',
        content: '我是内容',
        position: 'bottom',
      },
      mask: {
        closeable: false
        // withAnimation: false
        // bgColor: 'yellow'
      }
    })
  }, document.querySelector('#guide-mask-popover-mix-btn-box'), true)
}
