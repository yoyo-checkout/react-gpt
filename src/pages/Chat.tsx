import { useEffect } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { useLatest, useTitle } from 'react-use'
import { Conversation } from '@/components/Chat/Conversation'
import { replies } from '@/configs/replies'
import { useChatStore } from '@/hooks/useChatStore'
import { mittBus } from '@/plugins/mitt'
import { TConversation, TMessage } from '@/types'
import { getRandomItem } from '@/utils/index'
import { replyLikeEventStream } from '@/utils/reply'

export const Chat = () => {
  const { chats, updateChat } = useChatStore()
  const params = useParams()
  const _chat = chats.find((c) => c.id === params.id)
  const chat = useLatest(_chat)

  useTitle(chat.current?.name || 'React GPT')

  let mount = true

  const createConversation = async ({ id, conversation }: { id: string; conversation: TConversation }) => {
    const isUserConversation = conversation.owner === 'user'
    const newConversations = chat.current!.conversations.slice()

    if (isUserConversation) newConversations.push(conversation)
    newConversations.push({
      owner: 'bot',
      messages: [],
    })

    updateChat({
      ...chat.current!,
      conversations: newConversations,
    })

    const botReplies = isUserConversation ? [getRandomItem(replies)] : conversation.messages
    mittBus.emit('botTypingState', true)
    for (let i = 0; i < botReplies.length; i++) {
      if (!mount || id !== chat.current?.id) return stopBotReplyMessage()
      await botReplyMessage(id, botReplies[i])
    }
    mittBus.emit('botTypingState', false)
  }

  const botReplyMessage = async (id: string, message: TMessage) => {
    await replyLikeEventStream(message, (m, newLine) => {
      if (!mount || id !== chat.current?.id) return stopBotReplyMessage()

      const newConversations = chat.current!.conversations.map((c, index) => {
        if (index !== chat.current!.conversations.length - 1) return c

        const newMessages = c.messages.slice()
        const newMessage = {
          type: message.type,
          content: m,
          ...(message.type === 'code' && { language: message.language }),
        } as TMessage

        if (newLine) {
          newMessages.push(newMessage)
        } else {
          newMessages.splice(-1, 1, newMessage)
        }

        return {
          owner: c.owner,
          messages: newMessages,
        }
      })

      updateChat({
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
  }, [])

  useEffect(() => {
    mount = true
    return () => {
      mount = false
    }
  }, [])

  if (!chat.current) return <Navigate to="/" replace />
  return chat.current.conversations.map((c, conversionIndex) => <Conversation key={conversionIndex} conversation={c} />)
}
