import { throttle } from 'lodash-es'
import { useEffect, useRef, useState } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import { useScroll, useToggle } from 'react-use'
import { FeatureDisabledDialog } from '@/components/Dialog/FeatureDisabled'
import { SettingDialog } from '@/components/Dialog/Setting'
import { Header } from '@/components/Header'
import { Sidebar } from '@/components/Sidebar'
import { Textarea } from '@/components/Textarea'
import { useBreakpoint } from '@/hooks/useBreakpoint'
import { mittBus } from '@/plugins/mitt'

export const Layout = () => {
  const params = useParams()

  const containerRef = useRef<HTMLDivElement | null>(null)
  const scrollBottomRef = useRef<HTMLDivElement | null>(null)
  const [scrollBottomBtnVisible, setScrollBottomBtnVisible] = useState(false)

  const breakpoint = useBreakpoint()
  const { y } = useScroll(containerRef)
  const [sidebarVisible, toggleSidebar] = useToggle(breakpoint !== 'sm')

  const scrollToBottom = () => {
    const bottomCursor = scrollBottomRef.current
    if (!bottomCursor) return

    setTimeout(() => {
      bottomCursor.scrollIntoView({ behavior: 'smooth' })
    }, 0)
  }

  const throttlSetScrollBottomBtnVisible = throttle((v: boolean) => setScrollBottomBtnVisible(v), 300)

  useEffect(() => {
    if (breakpoint === 'sm') {
      if (sidebarVisible) toggleSidebar()
    } else if (!sidebarVisible) toggleSidebar()
  }, [breakpoint])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const threshold = 50
    const distance = container.scrollHeight - container.clientHeight - container.scrollTop
    throttlSetScrollBottomBtnVisible(distance > threshold)
  }, [y, params])

  useEffect(() => {
    mittBus.on('scroll2Bottom', scrollToBottom)
    return () => mittBus.off('scroll2Bottom', scrollToBottom)
  }, [])

  useEffect(() => {
    mittBus.on('toggleSidebar', toggleSidebar)
    return () => mittBus.off('toggleSidebar', toggleSidebar)
  }, [])

  return (
    <div className="relative z-0 flex h-full w-full overflow-hidden">
      <Sidebar visible={sidebarVisible} />
      <div className="relative flex h-full max-w-full flex-1 flex-col overflow-hidden">
        <Header />

        <main className="relative h-full w-full flex-1 overflow-auto transition-width">
          <div
            className={`hidden md:block fixed left-0 top-1/2 z-40 -translate-y-1/2 transition duration-500 ${sidebarVisible ? 'translate-x-[260px]' : ''}`}
            onClick={toggleSidebar}
          >
            <button>
              <div className="flex h-[72px] w-8 items-center justify-center">
                <div className="flex h-6 w-6 flex-col items-center">
                  <div className="h-3 w-1 rounded-full bg-token-text-quaternary translate-y-[2px]"></div>
                  <div className="h-3 w-1 rounded-full bg-token-text-quaternary translate-y-[-2px]"></div>
                </div>
                <span className="absolute w-px h-px m-[-1px] overflow-hidden whitespace-nowrap">關閉側邊欄</span>
              </div>
            </button>
          </div>

          <div className="flex h-full flex-col">
            <div className="flex-1 overflow-hidden">
              <div className="h-full">
                <div ref={containerRef} className="h-full w-full overflow-y-scroll">
                  <div className="flex flex-col text-sm pb-9 relative h-full">
                    <div className="hidden sticky top-0 mb-1.5 md:flex items-center justify-between z-10 h-14 p-2 font-semibold bg-token-main-surface-primary">
                      <div className="absolute left-1/2 -translate-x-1/2"></div>
                      <div className="flex items-center gap-2">
                        <button
                          className="group flex cursor-pointer items-center gap-1 rounded-xl py-2 px-3 text-lg font-medium hover:bg-token-main-surface-secondary radix-state-open:bg-token-main-surface-secondary"
                          onClick={() => mittBus.emit('openFeatureDisabledDialog')}
                        >
                          <div className="flex gap-x-1">
                            <span>ChatGPT</span>
                            <span className="text-token-text-secondary">3.5</span>
                          </div>
                          <svg
                            width="16"
                            height="17"
                            viewBox="0 0 16 17"
                            fill="none"
                            className="text-token-text-tertiary"
                          >
                            <path
                              d="M11.3346 7.83203L8.00131 11.1654L4.66797 7.83203"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></path>
                          </svg>
                        </button>
                      </div>
                      {params.id ? (
                        <div className="flex gap-2 pr-1">
                          <button
                            className="btn relative btn-neutral btn-small flex h-9 w-9 items-center justify-center whitespace-nowrap rounded-lg"
                            onClick={() => mittBus.emit('openFeatureDisabledDialog')}
                          >
                            <div className="flex w-full gap-2 items-center justify-center">
                              <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="icon-md"
                              >
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M11.2929 2.29289C11.6834 1.90237 12.3166 1.90237 12.7071 2.29289L16.7071 6.29289C17.0976 6.68342 17.0976 7.31658 16.7071 7.70711C16.3166 8.09763 15.6834 8.09763 15.2929 7.70711L13 5.41421V14C13 14.5523 12.5523 15 12 15C11.4477 15 11 14.5523 11 14V5.41421L8.70711 7.70711C8.31658 8.09763 7.68342 8.09763 7.29289 7.70711C6.90237 7.31658 6.90237 6.68342 7.29289 6.29289L11.2929 2.29289ZM4 13C4.55228 13 5 13.4477 5 14V18C5 18.5523 5.44772 19 6 19H18C18.5523 19 19 18.5523 19 18V14C19 13.4477 19.4477 13 20 13C20.5523 13 21 13.4477 21 14V18C21 19.6569 19.6569 21 18 21H6C4.34315 21 3 19.6569 3 18V14C3 13.4477 3.44772 13 4 13Z"
                                  fill="currentColor"
                                ></path>
                              </svg>
                            </div>
                          </button>
                        </div>
                      ) : null}
                    </div>

                    <Outlet />
                    <div ref={scrollBottomRef}></div>
                  </div>
                  {scrollBottomBtnVisible ? (
                    <button
                      className="cursor-pointer absolute z-10 rounded-full bg-clip-padding border text-token-text-secondary border-token-border-light left-1/2 bg-token-main-surface-primary bottom-24 -translate-x-1/2"
                      onClick={scrollToBottom}
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        className="m-1 text-token-text-primary"
                      >
                        <path
                          d="M17 13L12 18L7 13M12 6L12 17"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </svg>
                    </button>
                  ) : null}
                </div>
              </div>
            </div>

            <Textarea />
          </div>
        </main>
      </div>

      <SettingDialog />
      <FeatureDisabledDialog />
    </div>
  )
}
