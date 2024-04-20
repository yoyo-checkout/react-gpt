import dayjs from 'dayjs'
import { groupBy, orderBy } from 'lodash-es'
import { FC, useMemo, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useClickAway } from 'react-use'
import { Edit } from '@/components/image/Edit'
import { Logo } from '@/components/image/Logo'
import { More } from '@/components/image/More'
import { Seal } from '@/components/image/Seal'
import { useBreakpoint } from '@/hooks/useBreakpoint'
import { useChatStore } from '@/hooks/useChatStore'
import { mittBus } from '@/plugins/mitt'

interface Props {
  visible: boolean
}

export const Sidebar: FC<Props> = ({ visible }) => {
  const { chats } = useChatStore()
  const chatsGroupByTime = useMemo(() => {
    const sortedChats = orderBy(chats, (e) => e.create_at, 'desc')
    return groupBy(sortedChats, (c) => dayjs(c.create_at).fromNow())
  }, [chats])
  const breakpoint = useBreakpoint()

  const popupRef = useRef<HTMLDivElement | null>(null)
  const ignorePopupRef = useRef<HTMLButtonElement | null>(null)
  const [popupVisible, setPopupVisible] = useState(false)
  useClickAway(popupRef, (e: MouseEvent) => {
    if (ignorePopupRef.current?.contains(e.target as Node)) return
    setPopupVisible(false)
  })

  const togglePopup = () => {
    popupVisible ? setPopupVisible(false) : setPopupVisible(true)
  }

  const handleClickPopupItem = (action: 'customize' | 'setting' | 'logout') => {
    switch (action) {
      case 'setting':
        mittBus.emit('openSettingDialog')
        break
      case 'customize':
      case 'logout':
        mittBus.emit('openFeatureDisabledDialog')
        break
    }
    setPopupVisible(false)
  }

  return (
    <div
      className={`fixed h-full md:relative z-20 md:block flex-shrink-0 overflow-x-hidden transition-[width] duration-500 ${visible ? 'w-full md:w-[260px]' : 'w-0'}`}
    >
      <div className="flex h-full min-h-0 flex-row md:flex-col">
        <div className="scrollbar-trigger relative h-full w-full flex-1 items-start bg-token-sidebar-surface-primary border-white/20">
          <div className="md:hidden absolute right-0 top-0 z-10 -mr-12 pt-3.5">
            <button
              className="ml-1 flex h-10 w-10 items-center justify-center focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={() => mittBus.emit('toggleSidebar')}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="icon-md"
              >
                <path
                  d="M6.34315 6.34338L17.6569 17.6571M17.6569 6.34338L6.34315 17.6571"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </button>
          </div>
          <nav className="flex h-full w-full flex-col px-3 pb-3.5">
            <div className="flex-col flex-1 transition-opacity duration-500 -mr-2 pr-2 overflow-y-auto">
              <div className="sticky left-0 right-0 top-0 z-20 bg-token-sidebar-surface-primary pt-3.5">
                <div className="pb-0.5 last:pb-0">
                  <NavLink
                    to="/"
                    className="group flex h-10 items-center gap-2 rounded-lg bg-token-sidebar-surface-primary px-2 font-medium hover:bg-token-sidebar-surface-secondary cursor-pointer"
                    onClick={() => breakpoint === 'sm' && mittBus.emit('toggleSidebar')}
                  >
                    <div className="h-7 w-7 flex-shrink-0">
                      <div className="relative flex h-full items-center justify-center rounded-full bg-white text-gray-950">
                        <Logo className="h-2/3 w-2/3" />
                      </div>
                    </div>
                    <div className="grow overflow-hidden text-ellipsis whitespace-nowrap text-sm text-token-text-primary">
                      新交談
                    </div>
                    <div className="flex items-center">
                      <button className="text-token-text-primary">
                        <Edit className="icon-md" />
                      </button>
                    </div>
                  </NavLink>
                </div>
              </div>
              <div className="flex flex-col gap-2 pb-2 text-token-text-primary text-sm">
                {Object.entries(chatsGroupByTime).map(([time, chats]) => (
                  <div key={time} className="relative mt-5 empty:mt-0 empty:hidden">
                    <div>
                      <h3 className="h-9 pb-2 pt-3 px-2 text-xs font-medium text-ellipsis overflow-hidden break-all text-token-text-tertiary">
                        {time}
                      </h3>
                    </div>
                    <ol>
                      {chats.map((chat, i) => (
                        <li key={i} className="relative z-[15] overflow-hidden">
                          <div className="group relative rounded-lg active:opacity-90 hover:bg-token-sidebar-surface-secondary">
                            <NavLink
                              to={`/c/${chat.id}`}
                              className="flex items-center gap-2 p-2"
                              onClick={() => breakpoint === 'sm' && mittBus.emit('toggleSidebar')}
                            >
                              <div className="relative grow overflow-hidden whitespace-nowrap">
                                {chat.name}
                                <div className="absolute bottom-0 right-0 top-0 bg-gradient-to-l to-transparent from-token-sidebar-surface-primary group-hover:from-token-sidebar-surface-secondary w-8 from-0% group-hover:w-20 group-hover:from-60%"></div>
                              </div>
                            </NavLink>
                            <div className="absolute bottom-0 right-0 top-0 items-center gap-1.5 pr-2 hidden group-hover:flex">
                              <button
                                className="flex items-center justify-center text-token-text-primary transition hover:text-token-text-secondary radix-state-open:text-token-text-secondary"
                                onClick={() => mittBus.emit('openFeatureDisabledDialog')}
                              >
                                <More className="icon-md" />
                              </button>
                              <button
                                className="flex items-center justify-center text-token-text-primary transition hover:text-token-text-secondary radix-state-open:text-token-text-secondary"
                                onClick={() => mittBus.emit('openFeatureDisabledDialog')}
                              >
                                <Seal className="icon-md" />
                              </button>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ol>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col pt-2 empty:hidden dark:border-white/20">
              <a
                className="group flex gap-2 p-2.5 text-sm cursor-pointer focus:ring-0 radix-disabled:pointer-events-none radix-disabled:opacity-50 group items-center hover:bg-token-sidebar-surface-secondary m-0 rounded-lg px-2"
                onClick={() => mittBus.emit('openFeatureDisabledDialog')}
              >
                <span className="flex w-full flex-row flex-wrap-reverse justify-between">
                  <div className="flex items-center gap-2">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full border border-token-border-light">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                        className="icon-sm shrink-0"
                      >
                        <path
                          fill="currentColor"
                          d="M6.394 4.444c.188-.592 1.024-.592 1.212 0C8.4 8.9 9.1 9.6 13.556 10.394c.592.188.592 1.024 0 1.212C9.1 12.4 8.4 13.1 7.606 17.556c-.188.592-1.024.592-1.212 0C5.6 13.1 4.9 12.4.444 11.606c-.592-.188-.592-1.024 0-1.212C4.9 9.6 5.6 8.9 6.394 4.444m8.716 9.841a.41.41 0 0 1 .78 0c.51 2.865.96 3.315 3.825 3.826.38.12.38.658 0 .778-2.865.511-3.315.961-3.826 3.826a.408.408 0 0 1-.778 0c-.511-2.865-.961-3.315-3.826-3.826a.408.408 0 0 1 0-.778c2.865-.511 3.315-.961 3.826-3.826Zm2.457-12.968a.454.454 0 0 1 .866 0C19 4.5 19.5 5 22.683 5.567a.454.454 0 0 1 0 .866C19.5 7 19 7.5 18.433 10.683a.454.454 0 0 1-.866 0C17 7.5 16.5 7 13.317 6.433a.454.454 0 0 1 0-.866C16.5 5 17 4.5 17.567 1.317"
                        ></path>
                      </svg>
                    </span>
                    <div className="flex flex-col">
                      <span>升級方案</span>
                      <span className="line-clamp-1 text-xs text-token-text-tertiary">
                        獲得 GPT-4、DALL·E 等更多功能
                      </span>
                    </div>
                  </div>
                </span>
              </a>
              <div className="flex w-full items-center juice:md:hidden">
                <div className="max-w-[100%] grow">
                  <div className="group relative">
                    <button
                      ref={ignorePopupRef}
                      className="flex w-full max-w-[100%] items-center gap-2 rounded-lg p-2 text-sm  hover:bg-token-sidebar-surface-secondary group-ui-open:bg-token-sidebar-surface-secondary"
                      onClick={togglePopup}
                    >
                      <div className="flex-shrink-0">
                        <div className="flex items-center justify-center overflow-hidden rounded-full">
                          <div className="relative flex">
                            <img
                              alt="User"
                              loading="lazy"
                              width="32"
                              height="32"
                              decoding="async"
                              data-nimg="1"
                              className="rounded-sm text-transparent"
                              src="https://lh3.googleusercontent.com/a/AEdFTp6GgN-222yGc8n6P9sl7SIRnIHJ2dICSAtau3QI=s96-c"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="relative -top-px grow -space-y-px truncate text-left text-token-text-primary">
                        Yo John
                      </div>
                    </button>

                    {popupVisible ? (
                      <div
                        ref={popupRef}
                        className="popover absolute bottom-full left-0 z-20 mb-1 w-full overflow-hidden rounded-lg border border-token-border-light bg-token-main-surface-primary p-1.5 shadow-lg outline-none opacity-100 translate-y-0"
                      >
                        <nav>
                          <div className="ml-3 mr-2 py-2 text-sm text-token-text-secondary">johnyo@hello.world</div>
                          <div className="h-px bg-token-border-light my-1.5"></div>
                          <div
                            className="flex gap-2 rounded p-2.5 text-sm cursor-pointer focus:ring-0 radix-disabled:pointer-events-none radix-disabled:opacity-50 group items-center hover:bg-token-main-surface-secondary"
                            onClick={() => handleClickPopupItem('customize')}
                          >
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              className="icon-md"
                            >
                              <path
                                d="M10.663 6.3872C10.8152 6.29068 11 6.40984 11 6.59007V8C11 8.55229 11.4477 9 12 9C12.5523 9 13 8.55229 13 8V6.59007C13 6.40984 13.1848 6.29068 13.337 6.3872C14.036 6.83047 14.5 7.61105 14.5 8.5C14.5 9.53284 13.8737 10.4194 12.9801 10.8006C12.9932 10.865 13 10.9317 13 11V13C13 13.5523 12.5523 14 12 14C11.4477 14 11 13.5523 11 13V11C11 10.9317 11.0068 10.865 11.0199 10.8006C10.1263 10.4194 9.5 9.53284 9.5 8.5C9.5 7.61105 9.96397 6.83047 10.663 6.3872Z"
                                fill="currentColor"
                              ></path>
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M4 5V19C4 20.6569 5.34315 22 7 22H19C19.3346 22 19.6471 21.8326 19.8325 21.5541C20.0179 21.2755 20.0517 20.9227 19.9225 20.614C19.4458 19.4747 19.4458 18.5253 19.9225 17.386C19.9737 17.2637 20 17.1325 20 17V3C20 2.44772 19.5523 2 19 2H7C5.34315 2 4 3.34315 4 5ZM6 5C6 4.44772 6.44772 4 7 4H18V16H7C6.64936 16 6.31278 16.0602 6 16.1707V5ZM7 18H17.657C17.5343 18.6699 17.5343 19.3301 17.657 20H7C6.44772 20 6 19.5523 6 19C6 18.4477 6.44772 18 7 18Z"
                                fill="currentColor"
                              ></path>
                            </svg>
                            自訂 ChatGPT
                          </div>
                          <div
                            className="flex gap-2 rounded p-2.5 text-sm cursor-pointer focus:ring-0 radix-disabled:pointer-events-none radix-disabled:opacity-50 group items-center hover:bg-token-main-surface-secondary"
                            onClick={() => handleClickPopupItem('setting')}
                          >
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              className="icon-md"
                            >
                              <path
                                d="M11.6439 3C10.9352 3 10.2794 3.37508 9.92002 3.98596L9.49644 4.70605C8.96184 5.61487 7.98938 6.17632 6.93501 6.18489L6.09967 6.19168C5.39096 6.19744 4.73823 6.57783 4.38386 7.19161L4.02776 7.80841C3.67339 8.42219 3.67032 9.17767 4.01969 9.7943L4.43151 10.5212C4.95127 11.4386 4.95127 12.5615 4.43151 13.4788L4.01969 14.2057C3.67032 14.8224 3.67339 15.5778 4.02776 16.1916L4.38386 16.8084C4.73823 17.4222 5.39096 17.8026 6.09966 17.8083L6.93502 17.8151C7.98939 17.8237 8.96185 18.3851 9.49645 19.294L9.92002 20.014C10.2794 20.6249 10.9352 21 11.6439 21H12.3561C13.0648 21 13.7206 20.6249 14.08 20.014L14.5035 19.294C15.0381 18.3851 16.0106 17.8237 17.065 17.8151L17.9004 17.8083C18.6091 17.8026 19.2618 17.4222 19.6162 16.8084L19.9723 16.1916C20.3267 15.5778 20.3298 14.8224 19.9804 14.2057L19.5686 13.4788C19.0488 12.5615 19.0488 11.4386 19.5686 10.5212L19.9804 9.7943C20.3298 9.17767 20.3267 8.42219 19.9723 7.80841L19.6162 7.19161C19.2618 6.57783 18.6091 6.19744 17.9004 6.19168L17.065 6.18489C16.0106 6.17632 15.0382 5.61487 14.5036 4.70605L14.08 3.98596C13.7206 3.37508 13.0648 3 12.3561 3H11.6439Z"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinejoin="round"
                              ></path>
                              <circle cx="12" cy="12" r="2.5" stroke="currentColor" strokeWidth="2"></circle>
                            </svg>
                            設定
                          </div>
                          <div className="h-px bg-token-border-light my-1.5"></div>
                          <div
                            className="flex gap-2 rounded p-2.5 text-sm cursor-pointer focus:ring-0 radix-disabled:pointer-events-none radix-disabled:opacity-50 group items-center hover:bg-token-main-surface-secondary"
                            onClick={() => handleClickPopupItem('logout')}
                          >
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              className="icon-md"
                            >
                              <path
                                d="M11 3H7C5.89543 3 5 3.89543 5 5V19C5 20.1046 5.89543 21 7 21H11"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                              ></path>
                              <path
                                d="M20 12H11M20 12L16 16M20 12L16 8"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              ></path>
                            </svg>
                            登出
                          </div>
                        </nav>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </div>
        <div
          className="md:hidden shrink-0 w-14 h-full bg-black opacity-25"
          onClick={() => mittBus.emit('toggleSidebar')}
        ></div>
      </div>
    </div>
  )
}
