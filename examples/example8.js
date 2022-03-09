import { generatorEle, wait } from './utils.js'
import { guide } from '../es/index.js'

export function showExample8() {
  generatorEle(
    'button',
    '弹出层-可关闭',
    async function () {
      const { close } = guide('#guide-popover-closeable', {
        popover: {
          title: '该弹出层可关闭',
          content: '你好',
          closeable: true,
        },
        mask: null,
      })

      // await wait(1000)
      // close()
    },
    document.querySelector('#guide-popover-closeable-box'),
    true,
  )

  generatorEle(
    'button',
    '弹出层-不可关闭',
    async function () {
      const { close } = guide('#guide-popover-closeable', {
        popover: {
          title: '该弹出层不可关闭',
          content: '你好',
          closeable: false,
        },
        mask: null,
      })

      await wait(5000)
      close()
    },
    document.querySelector('#guide-popover-closeable-box'),
    true,
  )

  generatorEle(
    'button',
    '弹出层-连续动画',
    async function () {
      guide('#guide-popover-animation-btn-box', {
        popover: {
          title: '这是标题',
          content: '你好',
        },
        mask: null,
      })

      await wait(1000)

      guide('#guide-popover-closeable', {
        popover: {
          title: '这是标题',
          content: '你好',
        },
        mask: null,
      })

      await wait(1000)

      guide('#guide-popover-position-box div', {
        popover: {
          title: '这是标题',
          content: '你好',
        },
        mask: null,
      })
    },
    document.querySelector('#guide-popover-animation-btn-box'),
    true,
  )
}
