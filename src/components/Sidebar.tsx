import dayjs from 'dayjs'
import { groupBy } from 'lodash-es'
import { FC, useMemo } from 'react'
import { NavLink } from 'react-router-dom'
import { Edit } from '@/components/image/Edit'
import { Logo } from '@/components/image/Logo'
import { More } from '@/components/image/More'
import { Seal } from '@/components/image/Seal'
import { Chat as TChat } from '@/configs/chats'
import { mittBus } from '@/plugins/mitt'

interface Props {
  chats: TChat[]
  visible: boolean
}

export const Sidebar: FC<Props> = ({ chats, visible }) => {
  const chatsGroupByTime = useMemo(() => groupBy(chats, (c) => dayjs(c.create_at).fromNow()), [chats])

  return (
    <div
      className={`fixed h-full md:relative z-20 md:block flex-shrink-0 overflow-x-hidden transition-[width] duration-500 ${visible ? 'w-full md:w-[260px]' : 'w-0'}`}
    >
      <div className="flex h-full min-h-0 flex-row md:flex-col">
        <div className="scrollbar-trigger relative h-full w-full flex-1 items-start bg-token-sidebar-surface-primary border-white/20">
          <div className="md:hidden absolute right-0 top-0 z-10 -mr-12 pt-3.5">
            <button
              className="ml-1 flex h-10 w-10 items-center justify-center text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
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
                              onClick={() => mittBus.emit('toggleSidebar')}
                            >
                              <div className="relative grow overflow-hidden whitespace-nowrap">
                                {chat.name}
                                <div className="absolute bottom-0 right-0 top-0 bg-gradient-to-l to-transparent from-token-sidebar-surface-primary group-hover:from-token-sidebar-surface-secondary w-8 from-0% group-hover:w-20 group-hover:from-60%"></div>
                              </div>
                            </NavLink>
                            <div className="absolute bottom-0 right-0 top-0 items-center gap-1.5 pr-2 hidden group-hover:flex">
                              <button
                                className="flex items-center justify-center text-token-text-primary transition hover:text-token-text-secondary radix-state-open:text-token-text-secondary"
                                type="button"
                              >
                                <More className="icon-md" />
                              </button>
                              <button className="flex items-center justify-center text-token-text-primary transition hover:text-token-text-secondary radix-state-open:text-token-text-secondary">
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
              <a className="group flex gap-2 p-2.5 text-white text-sm cursor-pointer focus:ring-0 radix-disabled:pointer-events-none radix-disabled:opacity-50 group items-center hover:bg-token-sidebar-surface-secondary m-0 rounded-lg px-2">
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
                    <button className="flex w-full max-w-[100%] items-center gap-2 rounded-lg p-2 text-sm  hover:bg-token-sidebar-surface-secondary group-ui-open:bg-token-sidebar-surface-secondary">
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
