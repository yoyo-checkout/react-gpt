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
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
