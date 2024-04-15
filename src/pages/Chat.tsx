import { useEffect, useState } from 'react'
import { Navigate, useOutletContext, useParams } from 'react-router-dom'
import { useTitle } from 'react-use'
import { Conversation } from '@/components/Chat/Conversation'
import { Chat as TChat } from '@/configs/chats'
import { mittBus } from '@/plugins/mitt'

export const Chat = () => {
  const chats = useOutletContext<TChat[]>()
  const params = useParams()
  const _chat = chats.find((c) => c.id === params.id)
  if (!_chat) return <Navigate to="/" replace />

  const [chat, setChat] = useState(_chat)
  useTitle(chat.name)

  const updateChat = (content: string) => {
    setChat((c) => {
      const newConversations = c.conversations.slice()
      newConversations.push({
        owner: 'user',
        messages: [{ type: 'text', content }],
      })

      return { ...c, conversations: newConversations }
    })
  }

  useEffect(() => {
    setChat(_chat)
    mittBus.on('updateChat', updateChat)
    return () => mittBus.off('updateChat', updateChat)
  }, [_chat])

  return chat.conversations.map((c, conversionIndex) => <Conversation key={conversionIndex} conversation={c} />)
}
