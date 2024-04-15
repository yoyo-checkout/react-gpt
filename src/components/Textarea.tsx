import { chunk } from 'lodash-es'
import { ChangeEvent, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import { prompts, Prompt as TPrompt } from '@/configs/prompts'
import { useBreakpoint } from '@/hooks/useBreakpoint'
import { mittBus } from '@/plugins/mitt'

const Prompts = () => {
  const breakpoint = useBreakpoint()
  const promptChunks = useMemo(() => chunk(prompts.slice(breakpoint === 'sm' ? -2 : -4), 2), [breakpoint])

  function createChat(prompt: TPrompt) {
    mittBus.emit('createChat', {
      id: uuidv4(),
      name: prompt.title,
      create_at: new Date().getTime(),
      status: 'available',
      conversations: [
        {
          owner: 'user',
          messages: [
            {
              type: 'text',
              content: prompt.content,
            },
          ],
        },
        {
          owner: 'bot',
          messages: prompt.replies,
        },
      ],
    })
  }

  return (
    <div className="absolute bottom-full left-0 right-0">
      <div className="relative h-full w-full">
        <div className="h-full flex ml-1 md:w-full md:m-auto md:mb-4 gap-0 md:gap-2 justify-center">
          <div className="grow">
            <div className="absolute bottom-full left-0 mb-4 flex w-full grow gap-2 px-1 pb-1 sm:px-2 sm:pb-0 md:static md:mb-0 md:max-w-none">
              <div className="grid w-full grid-flow-row grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-2">
                {promptChunks.map((chunk, i) => {
                  return (
                    <div key={i} className="flex flex-col gap-2">
                      {chunk.map((prompt) => {
                        return (
                          <span key={prompt.title} onClick={() => createChat(prompt)}>
                            <button className="btn relative btn-neutral group w-full whitespace-nowrap rounded-xl px-4 py-3 text-left text-token-text-primary md:whitespace-normal">
                              <div className="flex w-full gap-2 items-center justify-center">
                                <div className="flex w-full items-center justify-between">
                                  <div className="flex flex-col overflow-hidden">
                                    <div className="truncate">{prompt.title}</div>
                                    <div className="truncate font-normal opacity-50">{prompt.desc}</div>
                                  </div>
                                  <div className="absolute bottom-0 right-0 top-0 flex items-center rounded-xl bg-gradient-to-l from-token-main-surface-secondary pl-6 pr-4 text-token-text-secondary opacity-0 group-hover:opacity-100">
                                    <span>
                                      <div className="rounded-lg bg-token-main-surface-primary p-1 shadow-xxs dark:shadow-none">
                                        <svg
                                          width="24"
                                          height="24"
                                          viewBox="0 0 24 24"
                                          fill="currentColor"
                                          className="icon-sm text-token-text-primary"
                                        >
                                          <path
                                            d="M7 11L12 6L17 11M12 18V7"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          ></path>
                                        </svg>
                                      </div>
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </button>
                          </span>
                        )
                      })}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const Textarea = () => {
  const params = useParams()
  const [prompt, setPrompt] = useState('')

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(() => e.target.value)
  }
  const handleSubmit = () => {
    mittBus.emit('updateChat', prompt)
    mittBus.emit('scroll2Bottom')
    setPrompt(() => '')
  }

  return (
    <div className="w-full pt-2 md:pt-0 dark:border-white/20 md:border-transparent md:dark:border-transparent md:w-[calc(100%-.5rem)]">
      <div className="stretch mx-2 flex flex-row gap-3 last:mb-2 md:mx-4 md:last:mb-6 lg:mx-auto lg:max-w-2xl xl:max-w-3xl">
        <div className="relative flex h-full flex-1 flex-col">
          {!params.id ? <Prompts /> : null}

          <div className="flex w-full items-center">
            <div className="overflow-hidden [&:has(textarea:focus)]:border-token-border-xheavy [&:has(textarea:focus)]:shadow-[0_2px_6px_rgba(0,0,0,.05)] flex flex-col w-full flex-grow relative border dark:text-white rounded-2xl bg-token-main-surface-primary border-token-border-medium">
              <textarea
                value={prompt}
                placeholder="傳訊息給 ChatGPT……"
                className="outline-none m-0 w-full resize-none border-0 bg-transparent focus:ring-0 focus-visible:ring-0 dark:bg-transparent py-[10px] pr-10 md:py-3.5 md:pr-12 max-h-[25dvh] h-[52px] overflow-y-hidden placeholder-black/50 dark:placeholder-white/50 pl-3 md:pl-4"
                onChange={handleChange}
              ></textarea>
              <button
                disabled={!prompt}
                className="absolute bottom-1.5 right-2 rounded-lg border border-black bg-black p-0.5 text-white transition-colors disabled:text-gray-400 disabled:opacity-10 dark:border-white dark:bg-white dark:hover:bg-white md:bottom-3 md:right-3"
                onClick={handleSubmit}
              >
                <span>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white dark:text-black">
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
  )
}
