import mitt from 'mitt'
import { TConversation } from '@/types'

export type MittEventType = {
  createConversation: { id: string; conversation: TConversation }
  botTypingState: boolean
  scroll2Bottom: undefined
  toggleSidebar: undefined
  openSettingDialog: undefined
  openFeatureDisabledDialog: undefined
}

export const mittBus = mitt<MittEventType>()
