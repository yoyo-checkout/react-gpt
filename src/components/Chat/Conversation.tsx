import { FC } from 'react'
import { Logo } from '@/components/image/Logo'
import { Conversation as TConversation, Message as TMessage } from '@/configs/chats'
import { Highlight } from './Highlight'

interface AvatarProps {
  conversation: TConversation
}

const Avatar: FC<AvatarProps> = ({ conversation }) => {
  if (conversation.owner === 'user') {
    return (
      <div className="relative flex">
        <img
          alt="User"
          loading="lazy"
          width="24"
          height="24"
          decoding="async"
          className="rounded-sm"
          src="https://lh3.googleusercontent.com/a/AEdFTp6GgN-222yGc8n6P9sl7SIRnIHJ2dICSAtau3QI=s96-c"
        />
      </div>
    )
  }

  return (
    <div className="relative p-1 rounded-sm text-white flex items-center justify-center bg-[#19c37d] w-6 h-6">
      <Logo className="icon-sm" />
    </div>
  )
}

interface MessageProps {
  message: TMessage
}

const Message: FC<MessageProps> = ({ message }) => {
  switch (message.type) {
    case 'text':
      return <div>{message.content}</div>
    case 'paragraph':
      return <p dangerouslySetInnerHTML={{ __html: message.content }}></p>
    case 'code':
      return <Highlight language={message.language!} code={message.content} />
    case 'list':
      return (
        <ol>
          {message.content.map((text, i) => {
            return <li key={i} dangerouslySetInnerHTML={{ __html: text }}></li>
          })}
        </ol>
      )
  }
}

interface ConversationProps {
  conversation: TConversation
}

export const Conversation: FC<ConversationProps> = ({ conversation: c }) => {
  return (
    <div className="w-full text-token-text-primary">
      <div className="px-4 py-2 justify-center text-base md:gap-6 m-auto">
        <div className="flex flex-1 text-base mx-auto gap-3 juice:gap-4 juice:md:gap-6 md:px-5 lg:px-1 xl:px-5 md:max-w-3xl lg:max-w-[40rem] xl:max-w-[48rem] group">
          <div className="flex-shrink-0 flex flex-col relative items-end">
            <div>
              <div className="pt-0.5">
                <div className="gizmo-shadow-stroke flex h-6 w-6 items-center justify-center overflow-hidden rounded-full">
                  <Avatar conversation={c} />
                </div>
              </div>
            </div>
          </div>

          <div className="relative flex w-full flex-col">
            <div className="font-semibold select-none">{c.owner === 'user' ? '你' : 'ChatGPT'}</div>
            <div className="flex-col gap-1 md:gap-3">
              <div className="flex flex-grow flex-col max-w-full">
                <div className="min-h-[20px] text-message flex flex-col items-start gap-3 whitespace-pre-wrap break-words [.text-message+&amp;]:mt-5 overflow-x-auto">
                  {c.owner === 'user' ? (
                    c.messages.map((m, i) => <Message key={i} message={m} />)
                  ) : (
                    <div className="markdown prose w-full break-words dark:prose-invert">
                      {c.messages.map((m, i) => (
                        <Message key={i} message={m} />
                      ))}
                    </div>
                  )}

                  {c.owner === 'user' ? (
                    <div className="mt-1 flex gap-3 empty:hidden juice:justify-end">
                      <div className="text-gray-400 flex self-end lg:self-center items-center justify-center lg:justify-start mt-0 -ml-1 h-7 gap-[2px] visible">
                        <button className="p-1 rounded-md text-token-text-tertiary hover:text-token-text-primary md:invisible md:group-hover:visible md:group-[.final-completion]:visible">
                          <div className="flex items-center gap-1.5 text-xs">
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
                                d="M13.2929 4.29291C15.0641 2.52167 17.9359 2.52167 19.7071 4.2929C21.4783 6.06414 21.4783 8.93588 19.7071 10.7071L18.7073 11.7069L11.1603 19.2539C10.7182 19.696 10.1489 19.989 9.53219 20.0918L4.1644 20.9864C3.84584 21.0395 3.52125 20.9355 3.29289 20.7071C3.06453 20.4788 2.96051 20.1542 3.0136 19.8356L3.90824 14.4678C4.01103 13.8511 4.30396 13.2818 4.7461 12.8397L13.2929 4.29291ZM13 7.41422L6.16031 14.2539C6.01293 14.4013 5.91529 14.591 5.88102 14.7966L5.21655 18.7835L9.20339 18.119C9.40898 18.0847 9.59872 17.9871 9.7461 17.8397L16.5858 11L13 7.41422ZM18 9.5858L14.4142 6.00001L14.7071 5.70712C15.6973 4.71693 17.3027 4.71693 18.2929 5.70712C19.2831 6.69731 19.2831 8.30272 18.2929 9.29291L18 9.5858Z"
                                fill="currentColor"
                              ></path>
                            </svg>
                          </div>
                        </button>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
              {c.owner === 'bot' ? (
                <div className="mt-1 flex gap-3 empty:hidden">
                  <div className="text-gray-400 flex self-end lg:self-center items-center justify-center lg:justify-start mt-0 -ml-1 h-7 gap-[2px] visible">
                    <span>
                      <button className="flex items-center gap-1.5 rounded-md p-1 text-xs text-token-text-tertiary hover:text-token-text-primary md:invisible md:group-hover:visible md:group-[.final-completion]:visible">
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
                            d="M12 3.5C10.8954 3.5 10 4.39543 10 5.5H14C14 4.39543 13.1046 3.5 12 3.5ZM8.53513 3.5C9.22675 2.3044 10.5194 1.5 12 1.5C13.4806 1.5 14.7733 2.3044 15.4649 3.5H17.25C18.9069 3.5 20.25 4.84315 20.25 6.5V18.5C20.25 20.1569 19.1569 21.5 17.25 21.5H6.75C5.09315 21.5 3.75 20.1569 3.75 18.5V6.5C3.75 4.84315 5.09315 3.5 6.75 3.5H8.53513ZM8 5.5H6.75C6.19772 5.5 5.75 5.94772 5.75 6.5V18.5C5.75 19.0523 6.19772 19.5 6.75 19.5H17.25C18.0523 19.5 18.25 19.0523 18.25 18.5V6.5C18.25 5.94772 17.8023 5.5 17.25 5.5H16C16 6.60457 15.1046 7.5 14 7.5H10C8.89543 7.5 8 6.60457 8 5.5Z"
                            fill="currentColor"
                          ></path>
                        </svg>
                      </button>
                    </span>
                    <span>
                      <button className="p-1 rounded-md text-token-text-tertiary hover:text-token-text-primary md:invisible md:group-hover:visible md:group-[.final-completion]:visible">
                        <div className="flex items-center gap-1.5 text-xs">
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
                              d="M4.5 2.5C5.05228 2.5 5.5 2.94772 5.5 3.5V5.07196C7.19872 3.47759 9.48483 2.5 12 2.5C17.2467 2.5 21.5 6.75329 21.5 12C21.5 17.2467 17.2467 21.5 12 21.5C7.1307 21.5 3.11828 17.8375 2.565 13.1164C2.50071 12.5679 2.89327 12.0711 3.4418 12.0068C3.99033 11.9425 4.48712 12.3351 4.5514 12.8836C4.98798 16.6089 8.15708 19.5 12 19.5C16.1421 19.5 19.5 16.1421 19.5 12C19.5 7.85786 16.1421 4.5 12 4.5C9.7796 4.5 7.7836 5.46469 6.40954 7H9C9.55228 7 10 7.44772 10 8C10 8.55228 9.55228 9 9 9H4.5C3.96064 9 3.52101 8.57299 3.50073 8.03859C3.49983 8.01771 3.49958 7.99677 3.5 7.9758V3.5C3.5 2.94772 3.94771 2.5 4.5 2.5Z"
                              fill="currentColor"
                            ></path>
                          </svg>
                        </div>
                      </button>
                    </span>
                    <div className="flex">
                      <span>
                        <button className="p-1 rounded-md text-token-text-tertiary hover:text-token-text-primary md:invisible md:group-hover:visible md:group-[.final-completion]:visible">
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
                              d="M11.8727 21.4961C11.6725 21.8466 11.2811 22.0423 10.8805 21.9922L10.4267 21.9355C7.95958 21.6271 6.36855 19.1665 7.09975 16.7901L7.65054 15H6.93226C4.29476 15 2.37923 12.4921 3.0732 9.94753L4.43684 4.94753C4.91145 3.20728 6.49209 2 8.29589 2H18.0045C19.6614 2 21.0045 3.34315 21.0045 5V12C21.0045 13.6569 19.6614 15 18.0045 15H16.0045C15.745 15 15.5054 15.1391 15.3766 15.3644L11.8727 21.4961ZM14.0045 4H8.29589C7.39399 4 6.60367 4.60364 6.36637 5.47376L5.00273 10.4738C4.65574 11.746 5.61351 13 6.93226 13H9.00451C9.32185 13 9.62036 13.1506 9.8089 13.4059C9.99743 13.6612 10.0536 13.9908 9.96028 14.2941L9.01131 17.3782C8.6661 18.5002 9.35608 19.6596 10.4726 19.9153L13.6401 14.3721C13.9523 13.8258 14.4376 13.4141 15.0045 13.1902V5C15.0045 4.44772 14.5568 4 14.0045 4ZM17.0045 13V5C17.0045 4.64937 16.9444 4.31278 16.8338 4H18.0045C18.5568 4 19.0045 4.44772 19.0045 5V12C19.0045 12.5523 18.5568 13 18.0045 13H17.0045Z"
                              fill="currentColor"
                            ></path>
                          </svg>
                        </button>
                      </span>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
