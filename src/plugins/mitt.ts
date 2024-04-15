import mitt from 'mitt'
import { Chat } from '@/configs/chats'

export type MittEventType = {
  updateChat: string
  createChat: Chat
  scroll2Bottom: undefined
}

export const mittBus = mitt<MittEventType>()
