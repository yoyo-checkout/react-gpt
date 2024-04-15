import { Navigate, useParams } from 'react-router-dom'
import { Conversation } from '@/components/Chat/Conversation'
import { chats } from '@/configs/chats'

export const Chat = () => {
  const params = useParams()
  const chat = chats.find((c) => c.id === params.id)

  if (!chat) return <Navigate to="/" replace />

  return (
    <main className="relative h-full w-full flex-1 overflow-auto transition-width">
      <div className="fixed left-0 top-1/2 z-40 translate-x-[260px] -translate-y-1/2">
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
            <div className="h-full w-full overflow-y-scroll">
              <div className="flex flex-col text-sm pb-9 relative">
                <div className="sticky top-0 mb-1.5 flex items-center justify-between z-10 h-14 p-2 font-semibold bg-token-main-surface-primary">
                  <div className="absolute left-1/2 -translate-x-1/2"></div>
                  <div className="flex items-center gap-2">
                    <button className="group flex cursor-pointer items-center gap-1 rounded-xl py-2 px-3 text-lg font-medium hover:bg-token-main-surface-secondary radix-state-open:bg-token-main-surface-secondary">
                      <div className="flex gap-x-1">
                        <span className="text-white">ChatGPT</span>
                        <span className="text-token-text-secondary">3.5</span>
                      </div>
                      <svg width="16" height="17" viewBox="0 0 16 17" fill="none" className="text-token-text-tertiary">
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
                  <div className="flex gap-2 pr-1">
                    <button className="text-white btn relative btn-neutral btn-small flex h-9 w-9 items-center justify-center whitespace-nowrap rounded-lg">
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
                </div>

                {chat.conversations.map((c, conversionIndex) => (
                  <Conversation key={conversionIndex} conversation={c} />
                ))}

                <button className="cursor-pointer absolute z-10 rounded-full bg-clip-padding border text-token-text-secondary border-token-border-light right-1/2 bg-token-main-surface-primary bottom-5">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="m-1 text-token-text-primary">
                    <path
                      d="M17 13L12 18L7 13M12 6L12 17"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full pt-2 md:pt-0 dark:border-white/20 md:border-transparent md:dark:border-transparent md:w-[calc(100%-.5rem)]">
          <div className="stretch mx-2 flex flex-row gap-3 last:mb-2 md:mx-4 md:last:mb-6 lg:mx-auto lg:max-w-2xl xl:max-w-3xl">
            <div className="relative flex h-full flex-1 flex-col">
              <div className="flex w-full items-center">
                <div className="overflow-hidden [&:has(textarea:focus)]:border-token-border-xheavy [&:has(textarea:focus)]:shadow-[0_2px_6px_rgba(0,0,0,.05)] flex flex-col w-full flex-grow relative border dark:text-white rounded-2xl bg-token-main-surface-primary border-token-border-medium">
                  <textarea
                    placeholder="傳訊息給 ChatGPT……"
                    className="outline-none m-0 w-full resize-none border-0 bg-transparent focus:ring-0 focus-visible:ring-0 dark:bg-transparent py-[10px] pr-10 md:py-3.5 md:pr-12 max-h-[25dvh] h-[52px] overflow-y-hidden placeholder-black/50 dark:placeholder-white/50 pl-3 md:pl-4"
                  ></textarea>
                  <button
                    disabled
                    className="absolute bottom-1.5 right-2 rounded-lg border border-black bg-black p-0.5 text-white transition-colors enabled:bg-black disabled:text-gray-400 disabled:opacity-10 dark:border-white dark:bg-white dark:hover:bg-white md:bottom-3 md:right-3"
                    data-testid="send-button"
                  >
                    <span>
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        className="text-white dark:text-black"
                      >
                        <path
                          d="M7 11L12 6L17 11M12 18V7"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </svg>
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="relative px-2 py-2 text-center text-xs text-token-text-secondary md:px-[60px]">
            <span>ChatGPT 可能會發生錯誤。建議你查核重要資訊。</span>
          </div>
        </div>
      </div>
    </main>
  )
}
