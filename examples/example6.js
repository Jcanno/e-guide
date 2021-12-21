import { generatorEle, wait } from './utils.js'
import { guide } from '../es/index.js'

export function showExample6() {
  let btnCloseMask = () => {}
  generatorEle('button', '自定义高亮流程', async function() {
    guide('#guide-custom-flow-box div:nth-child(1)', {
      popover: null
    })

    await wait(1000)
    guide('#guide-custom-flow-box div:nth-child(2)', {
      mask: {
        padding: 20,
        withAnimation: false
      },
      popover: null
    })

    await wait(2000)
    const { close } = guide('#guide-custom-flow-box div:nth-child(3)', {
      mask: {
        closeable: false
      },
      popover: null
    })
    btnCloseMask = close
  }, document.querySelector('#guide-custom-flow-box'))

  generatorEle('button', '关闭遮罩', async function() {
    btnCloseMask()
  }, document.querySelector('#guide-custom-flow-box div:nth-child(3)'), true)

}
