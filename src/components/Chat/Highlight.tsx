import hljs from 'highlight.js'
import { FC } from 'react'
import { useCopyToClipboard, useTimeout } from 'react-use'

interface Props {
  language: string
  code: string
}

export const Highlight: FC<Props> = ({ language, code }) => {
  const [state, copy] = useCopyToClipboard()
  const [isIdle, _cancel, reset] = useTimeout(3000)

  const highlightedCode = hljs.highlight(code, { language }).value

  const handleCopy = () => {
    copy(code)
    reset()
  }

  return (
    <pre>
      <div className="dark bg-gray-950 rounded-md">
        <div className="flex items-center relative text-token-text-secondary bg-token-main-surface-secondary px-4 py-2 text-xs font-sans justify-between rounded-t-md">
          <span>{language}</span>
          <span>
            {state.value && !isIdle() ? (
              <button className="flex gap-1 items-center">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon-sm"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M18.0633 5.67375C18.5196 5.98487 18.6374 6.607 18.3262 7.06331L10.8262 18.0633C10.6585 18.3093 10.3898 18.4678 10.0934 18.4956C9.79688 18.5234 9.50345 18.4176 9.29289 18.2071L4.79289 13.7071C4.40237 13.3166 4.40237 12.6834 4.79289 12.2929C5.18342 11.9023 5.81658 11.9023 6.20711 12.2929L9.85368 15.9394L16.6738 5.93664C16.9849 5.48033 17.607 5.36263 18.0633 5.67375Z"
                    fill="currentColor"
                  ></path>
                </svg>
                已複製！
              </button>
            ) : (
              <button className="flex gap-1 items-center" onClick={handleCopy}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon-sm"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 3.5C10.8954 3.5 10 4.39543 10 5.5H14C14 4.39543 13.1046 3.5 12 3.5ZM8.53513 3.5C9.22675 2.3044 10.5194 1.5 12 1.5C13.4806 1.5 14.7733 2.3044 15.4649 3.5H17.25C18.9069 3.5 20.25 4.84315 20.25 6.5V18.5C20.25 20.1569 19.1569 21.5 17.25 21.5H6.75C5.09315 21.5 3.75 20.1569 3.75 18.5V6.5C3.75 4.84315 5.09315 3.5 6.75 3.5H8.53513ZM8 5.5H6.75C6.19772 5.5 5.75 5.94772 5.75 6.5V18.5C5.75 19.0523 6.19772 19.5 6.75 19.5H17.25C18.0523 19.5 18.25 19.0523 18.25 18.5V6.5C18.25 5.94772 17.8023 5.5 17.25 5.5H16C16 6.60457 15.1046 7.5 14 7.5H10C8.89543 7.5 8 6.60457 8 5.5Z"
                    fill="currentColor"
                  ></path>
                </svg>
                Copy code
              </button>
            )}
          </span>
        </div>
        <div className="p-4 overflow-y-auto">
          <code className="!whitespace-pre hljs language-jsx">
            <div dangerouslySetInnerHTML={{ __html: highlightedCode }}></div>
          </code>
        </div>
      </div>
    </pre>
  )
}
