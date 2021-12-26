import { Mask, MaskProps } from './Mask'
import {
  getRect,
  Event,
  isInViewPort,
  findTargetElement,
  noop,
  isCanShowGuideByStroage,
  setStepGuidIdToStorage,
} from './utils'
import * as Guide from 'use-jsx'
import { Popover, PopoverProps } from './Popover'

type Options = {
  mask?: Partial<Pick<MaskProps, 'closeable' | 'bgColor' | 'withAnimation' | 'padding'>>
  popover?: Partial<
    Pick<
      PopoverProps,
      'title' | 'content' | 'position' | 'closeable' | 'withAnimation' | 'control' | 'showStepTip'
    >
  >
  scrollDisabled?: boolean
  beforeClose?: (currentStepIndex?: number) => void
}

type StepOptions = {
  onNextStep?: (currentStepIndex: number) => void
  onPrevStep?: (currentStepIndex: number) => void
  stepGuideId?: string
  showOnce?: boolean
  noMoreShow?: boolean
  noMoreText?: string
}

type Steps = Array<{ element: string | Element; options?: Options }>

type MergeOptions = StepOptions & Options

const event = new Event()
const originScroll = document.documentElement.style.overflow
const setScrollDisabled = (disabled: boolean) => {
  document.documentElement.style.overflow = disabled ? 'hidden' : originScroll
}

function initGuide() {
  Guide.render(<Mask show={false} withAnimation={false} />, document.body, 'mask')
  Guide.render(<Popover show={false} />, document.body, 'popover')
}

initGuide()

const defaultMaskOptions: Options['mask'] = {
  padding: 10,
  withAnimation: true,
  closeable: true,
  bgColor: 'rgb(0, 0, 0)',
}

const defaultPopoverOptions: Options['popover'] = {
  title: '',
  withAnimation: true,
  closeable: true,
  content: '',
  position: 'bottom',
}

function guide(
  steps: Steps,
  options?: StepOptions,
): {
  setStepTo: (index: number, mathAdd?: boolean) => void
  getCurrentStepIndex: () => void
  close: () => void
}
function guide(
  target: string | Element,
  options: Options,
): {
  close: () => void
}
function guide(target: string | Element | Steps, options?: MergeOptions) {
  const guideElement = (target: string | Element, options?: Options, currentStepIndex?: number) => {
    const {
      mask = defaultMaskOptions,
      popover = defaultPopoverOptions,
      scrollDisabled = false,
      beforeClose,
    } = options || {
      mask: defaultMaskOptions,
      popover: defaultPopoverOptions,
      scrollDisabled: false,
    }
    const element = findTargetElement(target)

    if (!element) {
      console.warn("can't found guide element")

      return {}
    }

    const close = function close() {
      typeof beforeClose === 'function'
        ? currentStepIndex !== null
          ? beforeClose(currentStepIndex)
          : beforeClose()
        : noop()
      const closeMask = () => {
        Guide.render(
          <Mask show={false} withAnimation={mask?.withAnimation} />,
          document.body,
          'mask',
        )
      }

      const closePopover = () => {
        Guide.render(<Popover show={false} />, document.body, 'popover')
      }

      setScrollDisabled(false)

      closeMask()
      closePopover()

      event.off('resize', window)
      event.off('scroll', window)
    }

    const scrollIntoView = (sizes: Partial<DOMRect>) => {
      if (!isInViewPort(sizes)) {
        element.scrollIntoView({ block: 'center', inline: 'center' })
      }
    }

    const render = function render() {
      const sizes = getRect(element)

      scrollIntoView(sizes)

      Guide.render(
        <Mask sizes={sizes} close={close} show={!!mask} {...mask} />,
        document.body,
        'mask',
      )

      Guide.render(
        <Popover
          sizes={sizes}
          show={!!popover}
          maskPadding={mask && mask.padding ? mask.padding : !!mask ? 10 : 0}
          close={close}
          {...popover}
        />,
        document.body,
        'popover',
      )

      setScrollDisabled(scrollDisabled)
    }

    event.bindOne('resize', render, window)
    event.bindOne('scroll', render, window)

    render()

    return {
      close,
    }
  }

  if (Array.isArray(target)) {
    if (target.length) {
      const stepOptions = options || {}
      if (stepOptions.stepGuideId && !isCanShowGuideByStroage(stepOptions.stepGuideId)) return {}
      ;(stepOptions.showOnce || stepOptions.noMoreShow) &&
        setStepGuidIdToStorage(
          stepOptions.stepGuideId,
          stepOptions.showOnce || !stepOptions.noMoreShow,
        )
      let currentStepIndex = 0
      let currentStep = target[currentStepIndex]

      const setStepTo = async (index: number, mathAdd: boolean = false) => {
        const nextStepIndex = mathAdd ? currentStepIndex + index : index
        const isGoNextStep = currentStepIndex + 1 === nextStepIndex
        const isGoPrevStep = currentStepIndex - 1 === nextStepIndex

        if (isGoNextStep || isGoPrevStep) {
          const stepHandler =
            (isGoPrevStep ? stepOptions.onPrevStep : stepOptions.onNextStep) || noop
          await stepHandler(currentStepIndex)
        }
        currentStepIndex = nextStepIndex
        currentStep = target[currentStepIndex]

        if (!currentStep) {
          throw new Error(`can't found step with index ${currentStepIndex}`)
        }

        startStep()
      }

      const getCurrentStepIndex = () => {
        return currentStepIndex
      }

      const startStep = () => {
        const { close } = guideElement(
          currentStep?.element,
          currentStep?.options,
          getCurrentStepIndex(),
        )

        return {
          close,
          setStepTo,
          getCurrentStepIndex,
        }
      }

      const onNoMoreShowClick = () => {
        setStepGuidIdToStorage(stepOptions.stepGuideId, true)
      }

      const enhanceMaskAndPopover = () => {
        target.forEach((step) => {
          step.options = step?.options || {}
          const popover = step?.options?.popover
          const mask = step?.options?.mask
          const enhanceApi = {
            setStepTo,
            getCurrentStepIndex,
            stepLength: target.length,
          }

          typeof options?.beforeClose === 'function' &&
            (step.options.beforeClose = options.beforeClose)
          ;(step.options.popover === undefined || step.options.popover) &&
            (step.options.popover = Object.assign(
              {},
              popover,
              {
                noMoreShow: !!stepOptions.noMoreShow,
                onNoMoreShowClick,
                noMoreText: stepOptions.noMoreText,
              },
              enhanceApi,
            ))
          ;(step.options.mask === undefined || step.options.mask) &&
            (step.options.mask = Object.assign({}, mask, enhanceApi))
        })
      }

      enhanceMaskAndPopover()

      return startStep()
    }
  } else {
    return guideElement(target, options, null)
  }
}

export { guide }
