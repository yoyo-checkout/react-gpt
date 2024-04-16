import mitt from 'mitt'
import { Chat as TChat, Conversation as TConversation, Message as TMessage } from '@/configs/chats'

export type MittEventType = {
  createChat: { chat: TChat; botReplies: TMessage[] }
  updateChat: TChat
  createConversation: TConversation
  botTypingState: boolean
  scroll2Bottom: undefined
  toggleSidebar: undefined
}

export const mittBus = mitt<MittEventType>()
