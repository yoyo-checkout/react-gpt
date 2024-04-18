import mitt from 'mitt'
import { TChat, TConversation, TMessage } from '@/types'

export type MittEventType = {
  createChat: { chat: TChat; botReplies: TMessage[] }
  updateChat: TChat
  createConversation: TConversation
  botTypingState: boolean
  scroll2Bottom: undefined
  toggleSidebar: undefined
  openSettingDialog: undefined
}

export const mittBus = mitt<MittEventType>()
