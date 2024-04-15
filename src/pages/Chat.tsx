import { Navigate, useParams } from 'react-router-dom'
import { Conversation } from '@/components/Chat/Conversation'
import { chats } from '@/configs/chats'

export const Chat = () => {
  const params = useParams()
  const chat = chats.find((c) => c.id === params.id)

  if (!chat) return <Navigate to="/" replace />
  return chat.conversations.map((c, conversionIndex) => <Conversation key={conversionIndex} conversation={c} />)
}
