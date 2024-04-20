import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/stores'
import { actions } from '@/stores/chat'
import { TChat, TMessage } from '@/types'

export const useChatStore = () => {
  const chats = useSelector((state: RootState) => state.chat.chats)
  const dispatch: AppDispatch = useDispatch()

  const createChat = useCallback((chat: TChat) => dispatch(actions.createChat(chat)), [dispatch])
  const updateChat = useCallback((chat: TChat) => dispatch(actions.updateChat(chat)), [dispatch])

  return {
    chats,
    createChat,
    updateChat,
  }
}
