import { generatorEle  } from './utils.js'
import { guide } from '../es/index.js'

export function showExample2() {
  generatorEle('button', '遮罩层-no padding', function() {
    guide('#guide-padding-box', {
      mask: {
        padding: 0
      },
      popover: null
    })
  }, document.querySelector('#guide-padding-btn-box'), true)

  generatorEle('button', '遮罩层-padding', function() {
    guide('#guide-padding-box', {
      mask: {
        padding: 10
      },
      popover: null
    })
  }, document.querySelector('#guide-padding-btn-box'), true)

  generatorEle('button', '遮罩层-more padding', function() {
    guide('#guide-padding-box', {
      mask: {
        padding: [20, 10]
      },
      popover: null
    })
  }, document.querySelector('#guide-padding-btn-box'), true)

}
