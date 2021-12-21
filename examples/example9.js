import { generatorEle  } from './utils.js'
import { guide } from '../es/index.js'

export function showExample9() {
  generatorEle('button', '弹出层定位-顶部', function() {
    guide('#guide-popover-position-box div', {
      popover: {
        title: '这是标题',
        content: '你好',
        position: 'top'
      },
      mask: null
    })
  }, document.querySelector('#guide-popover-position-btn-box'), true)

  generatorEle('button', '弹出层定位-底部', function() {
    guide('#guide-popover-position-box div', {
      popover: {
        title: '这是标题',
        content: '你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好',
        position: 'bottom'
      },
      mask: null
    })
  }, document.querySelector('#guide-popover-position-btn-box'), true)

  generatorEle('button', '弹出层定位-左侧', function() {
    guide('#guide-popover-position-box div', {
      popover: {
        title: '这是标题',
        content: '你好',
        position: 'left'
      },
      mask: null
    })
  }, document.querySelector('#guide-popover-position-btn-box'), true)

  generatorEle('button', '弹出层定位-右侧', function() {
    guide('#guide-popover-position-box div', {
      popover: {
        title: '这是标题',
        content: '你好',
        position: 'right'
      },
      mask: null
    })
  }, document.querySelector('#guide-popover-position-btn-box'), true)

}
