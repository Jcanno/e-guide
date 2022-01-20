# e-guide

### 介绍

用于用户导航的高亮组件

### 特性

- 基于原生 JS
- 只有一个主方法
- 遮罩层和弹出层功能任意搭配

### API



|  属性/方法    | 描述   |    类型          |    默认值      |
|  ----        | ----  |    ----         |    ----       |
| guide                           | 导航高亮主函数                                                                                                            | (target: string \| Element \| Array<{ element: string \| Element; options?: Options }>, options: Options) => GuideReturn                                                                                                                                   |                                                                                      |
| target                          | 导航高亮目标元素, 当为 string 时，该参数需要为元素选择器，当为 Element 时，需要为 DOM 元素， 当为数组时，开启导航步骤功能 | string \| Element \| Array<{ element: string \| Element; options?: Options }>Object                                                                                                                                                                        |
| options                         | 导航高亮配置, 分为遮罩层、弹出层及公共配置                                                                                | { mask?: Mask, popover?: Popover, scrollDisabled?: boolean, beforeClose?: () => void }                                                                                                                                                                     |
| options.mask                    | 遮罩层配置                                                                                                                | { closeable: boolean, bgColor: string, withAnimation: boolean, padding: number \| [number, number ] }                                                                                                                                                      | { padding: 10, withAnimation: true, closeable: true, bgColor: 'rgb(0, 0, 0)' }       |
| options.mask.padding            | 目标元素高亮外边距，当为数组时，可配置上下边距和左右边距                                                                  | number \| [number, number ]                                                                                                                                                                                                                                | 10                                                                                   |
| options.mask.closeable          | 遮罩层是否可关闭                                                                                                          | boolean                                                                                                                                                                                                                                                    | true                                                                                 |
| options.mask.highlightDisabled  | 高亮区域是否可以操作, 默认可以操作                                                                                        | boolean                                                                                                                                                                                                                                                    | false                                                                                |
| options.mask.bgColor            | 遮罩层背景颜色                                                                                                            | string                                                                                                                                                                                                                                                     | 'rgb(0, 0, 0)'                                                                       |
| options.mask.withAnimation      | 是否开启动画                                                                                                              | boolean                                                                                                                                                                                                                                                    | true                                                                                 |
| options.popover                 | 弹出层配置                                                                                                                | { title: string, content: string, position: ''bottom' \| 'bottomRight' \| 'bottomLeft' \| 'top' \| 'topRight' \| 'topLeft' \| 'left' \| 'leftTop' \| 'leftBottom' \| 'right' \| 'rightTop' \| 'rightBottom'', closeable: boolean, withAnimation: boolean } | { position: 'bottom', title: "", content: "", withAnimation: true, closeable: true } |
| options.popover.title           | 弹出层标题                                                                                                                | string                                                                                                                                                                                                                                                     | ""                                                                                   |
| options.popover.content         | 弹出层内容                                                                                                                | string                                                                                                                                                                                                                                                     | ""                                                                                   |
| options.popover.control         | 开启步骤时，是否开启内置控制前进后退的按钮                                                                                | boolean                                                                                                                                                                                                                                                    | true                                                                                 | boolean |
| options.popover.withAnimation   | 是否开启动画                                                                                                              | boolean                                                                                                                                                                                                                                                    | true                                                                                 |
| options.popover.closeable       | 弹出层是否可关闭, false 时不会有关闭按钮                                                                                  | boolean                                                                                                                                                                                                                                                    | true                                                                                 |
| options.popover.position        | 弹出层定位, 支持 12 个方向                                                                                                | 'bottom' \| 'bottomRight' \| 'bottomLeft' \| 'top' \| 'topRight' \| 'topLeft' \| 'left' \| 'leftTop' \| 'leftBottom' \| 'right' \| 'rightTop' \| 'rightBottom'                                                                                             | 'bottom'                                                                             |
| options.popover.showStepTip     | 步骤开启时，展示步骤进度提示信息钮                                                                                        | boolean                                                                                                                                                                                                                                                    | true                                                                                 |
| options.scrollDisabled          | 弹出层及遮罩层是否禁用滚动                                                                                                | boolean                                                                                                                                                                                                                                                    | false                                                                                |
| options.beforeClose             | 弹出层及遮罩层关闭前回调，步骤模式下，外层 beforeClose 会覆盖内层 beforeClose，此时会传入当前步骤下标                     | (currentStepIndex?: number) => void                                                                                                                                                                                                                        |
| options.onNextStep              | 下一步回调，可执行异步操作                                                                                                | (currentStepIndex: number) => void                                                                                                                                                                                                                         |
| options.onPrevStep              | 上一步回调，可执行异步操作                                                                                                | (currentStepIndex: number) => void                                                                                                                                                                                                                         |
| options.stepGuideId             | 手动配置此次步骤演示的唯一 id                                                                                             | string                                                                                                                                                                                                                                                     |
| options.showOnce                | 只展示一次，需要配置 stepGuideId，否则无效                                                                                | boolean                                                                                                                                                                                                                                                    | false                                                                                |
| options.noMoreShow              | 是否展示不再提示按钮，需要配置 stepGuideId，否则无效                                                                      | boolean                                                                                                                                                                                                                                                    | false                                                                                |
| options.noMoreText              | 不再提示文案                                                                                                              | string                                                                                                                                                                                                                                                     | '不再提示'                                                                           |
| GuideReturn                     | 导航返回对象，该对象提供一些方法控制导航功能                                                                              | object                                                                                                                                                                                                                                                     |
| GuideReturn.close               | 控制弹出层及遮罩层的关闭方法                                                                                              | () => void                                                                                                                                                                                                                                                 |
| GuideReturn.setStepTo           | 在步骤功能开启时返回，设置弹出层及遮罩层的当前步骤位置                                                                    | (index: number, mathAdd: boolean) => void                                                                                                                                                                                                                  |
| GuideReturn.getCurrentStepIndex | 获取当前步骤下标                                                                                                          | () => number                                                                                                                                                                                                                                               |

### 例子

#### 常规使用

```js
import { guide } from 'e-guide'

// 只开启遮罩层
guide('#example', {
  mask: {
    withAnimation: true,
    padding: [20, 10],
  },
  popover: null,
})

// 只开启弹出层
guide('#example', {
  mask: null,
  popover: {
    title: '这是标题',
    content: '你好',
    closeable: false,
    position: 'top',
  },
})

// 同时开启遮罩层和弹出层
guide('#example', {
  mask: {
    withAnimation: true,
    padding: [20, 10],
  },
  popover: {
    title: '这是标题',
    content: '你好',
    closeable: false,
    position: 'top',
  },
})

// 目标DOM元素
guide(document.getElementById('example'), {
  mask: {
    withAnimation: true,
    padding: [20, 10],
  },
  popover: {
    title: '这是标题',
    content: '你好',
    closeable: false,
    position: 'top',
  },
})

// 使用步骤指引
guide([
  {
    element: '#example',
    options: {
      mask: {
        withAnimation: true,
        padding: [20, 10],
      },
      popover: {
        title: '这是标题',
        content: '你好',
        closeable: false,
        position: 'top',
      },
    },
  },
  {
    element: '#example1',
    options: {
      mask: {
        withAnimation: true,
        padding: 20,
      },
      popover: {
        title: '这是标题2',
        content: 'hello',
        closeable: false,
        position: 'bottom',
      },
    },
  },
  {
    element: '#example2',
    options: {
      mask: {
        withAnimation: true,
        padding: 20,
      },
      popover: {
        title: '这是标题3',
        content: 'guide',
        position: 'left',
      },
    },
  },
])
```

#### 步骤控制

```js
// 步骤上一步、下一步的回调控制, 支持异步操作
guide(
  [
    {
      element: '#example',
      options: {
        mask: {
          withAnimation: true,
          padding: [20, 10],
        },
        popover: {
          title: '这是标题',
          content: '你好',
          closeable: false,
          position: 'top',
        },
      },
    },
    {
      element: '#example2',
      options: {
        mask: {
          withAnimation: true,
          padding: 20,
        },
        popover: {
          title: '这是标题3',
          content: 'guide',
          position: 'left',
        },
      },
    },
  ],
  {
    onNextStep: async (currentStepIndex) => {
      if (currentStepIndex === 0) {
        await wait(1000)
      }
    },
    onPrevStep: async (currentStepIndex) => {
      if (currentStepIndex === 1) {
        await wait(1000)
      }
    },
  },
)
```

#### 步骤只展示一次配置

```js
guide(
  [
    {
      element: '#example',
      options: {
        mask: {
          withAnimation: true,
          padding: [20, 10],
        },
        popover: {
          title: '这是标题',
          content: '你好',
          closeable: false,
          position: 'top',
        },
      },
    },
    {
      element: '#example2',
      options: {
        mask: {
          withAnimation: true,
          padding: 20,
        },
        popover: {
          title: '这是标题3',
          content: 'guide',
          position: 'left',
        },
      },
    },
  ],
  {
    // 手动配置步骤id作为本次指引的唯一标识，用于只展示一次逻辑
    stepGuideId: 'guide-id',
    showOnce: true,
  },
)
```

#### 不再提示配置

```js
guide(
  [
    {
      element: '#example',
      options: {
        mask: {
          withAnimation: true,
          padding: [20, 10],
        },
        popover: {
          title: '这是标题',
          content: '你好',
          closeable: false,
          position: 'top',
        },
      },
    },
    {
      element: '#example2',
      options: {
        mask: {
          withAnimation: true,
          padding: 20,
        },
        popover: {
          title: '这是标题3',
          content: 'guide',
          position: 'left',
        },
      },
    },
  ],
  {
    // 手动配置步骤id作为本次指引的唯一标识，用于只展示一次逻辑
    stepGuideId: 'guide-id',
    noMoreShow: true,
    // 可配置文案
    noMoreText: '不再',
  },
)
```

### 在 React 中使用

```js
// 可以使用ref获取到目标DOM，也可以使用选择器
import { guide } from 'e-guide'
import React, { useRef } from 'react'

function App() {
  const ref = useRef()

  const onClick = () => {
    guide(ref.current, {
      scrollDisabled: false,
      mask: {
        padding: [10, 20],
      },
    })
  }

  return (
    <button ref={ref} onClick={onClick}>
      指引
    </button>
  )
}
```
