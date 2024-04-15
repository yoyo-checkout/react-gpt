export const Textarea = () => {
  return (
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
