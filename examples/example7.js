import { generatorEle  } from './utils.js'
import { guide } from '../es/index.js'

export function showExample7() {
  generatorEle('button', '弹出层-无动画', async function() {
    guide('#guide-popover-animation-btn-box', {
      popover: {
        title: '这是标题',
        content: '你好',
        withAnimation: false
      },
      mask: null
    })
  }, document.querySelector('#guide-popover-animation-btn-box'), true)

  generatorEle('button', '弹出层-动画', async function() {
    guide('#guide-popover-animation-btn-box', {
      popover: {
        title: '这是标题',
        content: '你好',
        withAnimation: true
      },
      mask: null
    })
  }, document.querySelector('#guide-popover-animation-btn-box'), true)

}
