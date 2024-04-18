import { useEffect } from 'react'
import { Navigate, useOutletContext, useParams } from 'react-router-dom'
import { useLatest, useTitle } from 'react-use'
import { Conversation } from '@/components/Chat/Conversation'
import { replies } from '@/configs/replies'
import { mittBus } from '@/plugins/mitt'
import { TChat, TConversation, TMessage } from '@/types'
import { getRandomItem } from '@/utils/index'
import { replyLikeEventStream } from '@/utils/reply'

export const Chat = () => {
  const chats = useOutletContext<TChat[]>()
  const params = useParams()
  const _chat = chats.find((c) => c.id === params.id)
  const chat = useLatest(_chat)

  useTitle(chat.current?.name || 'React GPT')

  let mount = true

  const createConversation = async (conversation: TConversation) => {
    const isUserConversation = conversation.owner === 'user'
    const newConversations = chat.current!.conversations.slice()

    if (isUserConversation) newConversations.push(conversation)
    newConversations.push({
      owner: 'bot',
      messages: [],
    })

    mittBus.emit('updateChat', {
      ...chat.current!,
      conversations: newConversations,
    })

    const botReplies = isUserConversation ? [getRandomItem(replies)] : conversation.messages
    mittBus.emit('botTypingState', true)
    for (let i = 0; i < botReplies.length; i++) {
      if (!mount || params.id !== chat.current?.id) return stopBotReplyMessage()
      await botReplyMessage(botReplies[i])
    }
    mittBus.emit('botTypingState', false)
  }

  const botReplyMessage = async (message: TMessage) => {
    await replyLikeEventStream(message, (m, newLine) => {
      if (!mount || params.id !== chat.current?.id) return stopBotReplyMessage()

      const newConversations = chat.current!.conversations.slice()
      const lastConversation = newConversations.slice(-1)[0]
      const newMessage = {
        type: message.type,
        content: m,
        ...(message.type === 'code' && { language: message.language }),
      } as TMessage

      if (newLine) {
        lastConversation.messages.push(newMessage)
      } else {
        lastConversation.messages.splice(-1, 1, newMessage)
      }

      mittBus.emit('updateChat', {
        ...chat.current!,
        conversations: newConversations,
      })
    })
  }
  const stopBotReplyMessage = () => {
    mittBus.emit('botTypingState', false)
    return true
  }

  useEffect(() => {
    mittBus.on('createConversation', createConversation)
    return () => mittBus.off('createConversation', createConversation)
  }, [chat.current])

  useEffect(() => {
    mount = true
    return () => {
      mount = false
    }
  }, [])

  if (!chat.current) return <Navigate to="/" replace />
  return chat.current.conversations.map((c, conversionIndex) => <Conversation key={conversionIndex} conversation={c} />)
}
